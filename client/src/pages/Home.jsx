/* eslint-disable react/no-unescaped-entities */
import { Link } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/post/getPosts');
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await res.json();
        setPosts(data.posts);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchPosts();
  }, []);
  
  return (
    <div style={{ fontFamily: 'Oswald, sans-serif' }}>
      <div className='flex flex-col gap-6 p-8 max-w-6xl mx-auto'>
        <h1 className='text-3xl font-bold lg:text-6xl'>Welcome to Armarch</h1>
        <p className='text-gray-500 text-sm'>
          Where Architecture Meets Sustainability
        </p>
        <Link
          to='/search'
          className='text-sm text-teal-500 font-bold hover:underline'
        >
          View all posts
        </Link>
      </div>
      <div className='max-w-6xl mx-auto px-3 py-7'>
        {posts && posts.length > 0 && (
          <div className='flex flex-col gap-20 w-full'>
            <h2 className='text-2xl font-semibold text-center'>Recent Projects</h2>
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
             <div className='p-3 bg-amber-100 dark:bg-slate-700'>
        <CallToAction />
      </div>
          </div>
        )}
      </div>
    </div>
  );
}