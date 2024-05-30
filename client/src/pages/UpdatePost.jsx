import { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';


export default function UpdatePost() {
  const [files, setFiles] = useState([]);
  const [imageUploadProgress, setImageUploadProgress] = useState([]);
  const [imageUploadError, setImageUploadError] = useState([]);
  const [formData, setFormData] = useState({ images: [] });
  const [publishError, setPublishError] = useState(null);
  const { postId } = useParams();

  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/post/getposts?postId=${postId}`);
        const data = await res.json();
        if (!res.ok) {
          setPublishError(data.message);
          return;
        }
        
        console.log('Fetched post data:', data.posts[0]); // Log the fetched data
        setFormData(data.posts[0]);
      } catch (error) {
        setPublishError('Failed to fetch post');
      }
    };
  
    fetchPost();
  }, [postId]);
  

  const handleUploadImages = async () => {
    try {
      const uploadPromises = files.map(async (file, index) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + '-' + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
        return new Promise((resolve, reject) => {
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setImageUploadProgress((prev) => {
                const newProgress = [...prev];
                newProgress[index] = progress.toFixed(0);
                return newProgress;
              });
            },
            (error) => {
              setImageUploadError((prev) => [...prev, 'Image upload failed']);
              resolve();
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setImageUploadProgress((prev) =>
                  prev.filter((_, idx) => idx !== index)
                );
                setFormData((prev) => ({
                  ...prev,
                  images: [...prev.images, downloadURL],
                }));
                resolve();
              });
            }
          );
        });
      });
      await Promise.all(uploadPromises);
    } catch (error) {
      setImageUploadError((prev) => [...prev, 'Image upload failed']);
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data before submission:', formData);
    try {
      if (!formData._id) {
        throw new Error("Post ID is not defined");
      }
  
      const res = await fetch(`/api/post/updatepost/${formData._id}/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }
      navigate(`/post/${data.slug}`);
    } catch (error) {
      console.error(error);
      setPublishError('Something went wrong');
    }
  };

  const handleFileInputChange = (e) => {
    const filesArray = Array.from(e.target.files);
    setFiles(filesArray);
  };

  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Update Post</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput
            type='text'
            placeholder='Title'
            required
            id='title'
            className='flex-1'
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            value={formData.title || ''}
          />
          <Select
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            value={formData.category || ''}
          >
            <option value='uncategorized'>Select a category</option>
            <option value='residential'>Residential</option>
            <option value='commercial'>Commercial</option>
            <option value='multi-purpose-towers'>Multi-Purpose Towers</option>
            <option value='industrial'>Industrial</option>
            <option value='town-planning'>Town Planning</option>
            <option value='religious-buildings'>Religious Buildings</option>
            <option value='recreational-buildings'>Recreational Buildings</option>
          </Select>
        </div>
        <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
          <FileInput
            type='file'
            accept='image/*'
            multiple
            onChange={handleFileInputChange}
          />
          <Button
            type='button'
            gradientDuoTone='purpleToBlue'
            size='sm'
            outline
            onClick={handleUploadImages}
            disabled={imageUploadProgress.length > 0}
          >
            {imageUploadProgress.length > 0 ? (
              <div className='w-16 h-16'>
                {imageUploadProgress.map((progress, index) => (
                  <div key={index}>
                    <CircularProgressbar value={progress} text={`${progress || 0}%`} />
                  </div>
                ))}
              </div>
            ) : (
              'Upload Images'
            )}
          </Button>
        </div>
        {imageUploadError.length > 0 && <Alert color='failure'>{imageUploadError.join(', ')}</Alert>}
        {formData.images && (
          <div className='flex gap-4'>
            {formData.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Image ${index}`}
                className='w-32 h-32 object-cover'
              />
            ))}
          </div>
        )}
        <ReactQuill
          theme='snow'
          value={formData.content || ''}
          placeholder='Write something...'
          className='h-72 mb-12'
          required
          onChange={(value) => setFormData({ ...formData, content: value })}
        />
        <Button type='submit' gradientDuoTone='purpleToPink'>
          Update Post
        </Button>
        {publishError && <Alert className='mt-5' color='failure'>{publishError}</Alert>}
      </form>
    </div>
  );
}
