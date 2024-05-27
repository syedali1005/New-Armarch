import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import { Link } from 'react-router-dom';

export default function Projects() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getPosts');
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);

  return (
    <div style={{ fontFamily: 'Oswald, sans-serif' }}>
    <div className='flex flex-col gap-6 p-8 max-w-6xl mx-auto'>
        <h1 className='text-3xl font-bold lg:text-6xl text-center'>Our Projects</h1>
      </div>

      <div className='max-w-6xl mx-auto px-3 py-7'>
        {posts && posts.length > 0 && (
          <div className='flex flex-col gap-20 w-full'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-4 gap-y-8 justify-center'>
              {posts.map((post) => (
                <div key={post._id} className='max-w-xs mx-auto'>
                  <PostCard post={post} />
                </div>
              ))}
            </div>
            <Link
              to={'/search'}
              className='text-lg text-teal-500 hover:underline text-center'
            >
              View all posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}