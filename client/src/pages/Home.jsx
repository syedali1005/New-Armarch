import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
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
    <div
      style={{ fontFamily: 'Inter, sans-serif' }}
      className="bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-50"
    >
      <div className="flex flex-col gap-6 p-8 max-w-6xl mx-auto text-center">
        <motion.h1
          className="text-3xl font-bold lg:text-6xl"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Welcome to Armarch
        </motion.h1>
        <motion.p
          className="text-gray-500 dark:text-gray-400 text-sm"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Where Architecture Meets Sustainability
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <Link
            to="/search"
            className="text-sm text-teal-500 dark:text-teal-300 font-bold hover:underline"
          >
            View all posts
          </Link>
        </motion.div>
      </div>
      <div className="max-w-6xl mx-auto px-3 py-7">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-20 w-full">
            <motion.h2
              className="text-2xl font-semibold text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            >
              Recent Projects
            </motion.h2>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-4 gap-y-8 justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              {posts.map((post) => (
                <motion.div
                  key={post._id}
                  className="max-w-xs mx-auto"
                  whileHover={{ scale: 1.05 }}
                >
                  <PostCard post={post} />
                </motion.div>
              ))}
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="text-center"
            >
              <Link
                to="/search"
                className="text-lg text-teal-500 dark:text-teal-300 hover:underline"
              >
                View all posts
              </Link>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
