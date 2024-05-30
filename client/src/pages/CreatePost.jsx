import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [files, setFiles] = useState([]);
  const [imageUploadProgress, setImageUploadProgress] = useState([]);
  const [imageUploadError, setImageUploadError] = useState([]);
  const [formData, setFormData] = useState({ images: [] }); // Ensure images is initialized as an empty array
  const [publishError, setPublishError] = useState(null);

  const navigate = useNavigate();

  const handleUploadImages = async () => {
    try {
      const uploadPromises = files.map(async (file) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + "-" + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
        return new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setImageUploadProgress((prev) => [...prev, progress.toFixed(0)]);
            },
            (error) => {
              setImageUploadError((prev) => [...prev, "Image upload failed"]);
              resolve();
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setImageUploadProgress((prev) =>
                  prev.filter((_, index) => index !== files.indexOf(file))
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
      setImageUploadError((prev) => [...prev, "Image upload failed"]);
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/post/create', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "access_token": document.cookie.split('=')[1],
        },
        body: JSON.stringify({ ...formData, images: formData.images }),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }
      if (res.ok) {
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

  const handleFileInputChange = (e) => {
    const filesArray = Array.from(e.target.files);
    setFiles(filesArray);
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value="uncategorized">Select a category</option>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
            <option value="multi-purpose-towers">Multi-Purpose Towers</option>
            <option value="industrial">Industrial</option>
            <option value="town-planning">Town Planning</option>
            <option value="religious-buildings">Religious Buildings</option>
            <option value="recreational-buildings">Recreational Building</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileInputChange}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={handleUploadImages}
            disabled={imageUploadProgress.length > 0}
          >
            {imageUploadProgress.length > 0 ? (
              <div className="w-16 h-16">
                {imageUploadProgress.map((progress, index) => (
                  <div key={index}>
                    <CircularProgressbar value={progress} text={`${progress || 0}%`} />
                  </div>
                ))}
              </div>
            ) : (
              "Upload Images"
            )}
          </Button>
        </div>
        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
        {formData.images && (
          <div className="flex gap-4">
            {formData.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Image ${index}`}
                className="w-32 h-32 object-cover"
              />
            ))}
          </div>
        )}
        <ReactQuill
          theme="snow"
          placeholder="Write something..."
          className="h-72 mb-12"
          required
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
        />
        <Button type="submit" gradientDuoTone="purpleToPink">
          Upload
        </Button>
        {publishError && (
          <Alert className="mt-5" color="failure">
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}
