import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PostCard from "../components/PostCard";
import LazyLoad from 'react-lazyload';

export default function Projects() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/post/getPosts");
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await res.json();
        setPosts(data.posts);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{ fontFamily: "Oswald, sans-serif" }}
        className="flex justify-center items-center min-h-screen"
      >
        <div>Loading...</div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{ fontFamily: "Oswald, sans-serif" }}
        className="flex justify-center items-center min-h-screen"
      >
        <div>{error}</div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{ fontFamily: "Oswald, sans-serif" }}
    >
      <div className="flex flex-col gap-6 p-8 max-w-6xl mx-auto">
        <motion.h1
          className="md:text-5xl font-semibold text-center mb-20 text-stroke-2-gold hero-title1"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Our Projects
        </motion.h1>
      </div>

      <div className="max-w-6xl mx-auto px-3 py-7">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-20 w-full">
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
                  <LazyLoad height={200} offset={100}>
                    <PostCard post={post} />
                  </LazyLoad>
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
                className="text-lg text-yellow-500 hover:underline inline-block border border-yellow-500 py-2 px-4 rounded-lg transition duration-300 ease-in-out hover:bg-yellow-500 hover:text-white"
              >
                View More
              </Link>
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
