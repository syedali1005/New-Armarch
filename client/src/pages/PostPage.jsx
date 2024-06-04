import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Spinner } from "flowbite-react";
import CallToAction from "../components/CallToAction";
import LazyLoad from 'react-lazyload'; // Import LazyLoad component
import { motion } from "framer-motion";
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit'; // Add parent-fit plugin for better image fitting

export default function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        setPost(data.posts[0]);
        setLoading(false);
        setError(false);

        // Prefetch images
        data.posts[0].images.forEach((image) => {
          const link = document.createElement('link');
          link.rel = 'prefetch';
          link.href = image;
          document.head.appendChild(link);
        });

      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen"
    >
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <Spinner size="xl" />
        </div>
      ) : (
        <>
          <motion.h1
            className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4x"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {post.title}
          </motion.h1>
          <Link
            to={`/search?category=${post.category}`}
            className="self-center mt-5"
          >
            <Button color="gray" pill size="xs" className="animate-pulse">
              {post.category}
            </Button>
          </Link>
          <motion.div
            className="flex flex-wrap justify-center gap-4 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {post.images.map((image, index) => (
              <LazyLoad height={200} offset={100} key={index}>
                <div
                  className="max-w-md w-full md:max-w-lg transform transition-transform hover:scale-105"
                >
                  <div className="w-full h-auto object-cover rounded-lg shadow-md bg-gray-200" style={{ minHeight: '270px' }}>
                    {/* Add loading animation here */}
                    {loading ? (
                      <div className="animate-pulse w-full h-auto object-cover rounded-lg shadow-md bg-gray-300" style={{ minHeight: '270px' }} />
                    ) : (
                      <img
                        data-src={image}
                        alt={`Image ${index}`}
                        loading="lazy"
                        className="w-full h-auto object-cover rounded-lg shadow-md lazyload"
                        data-sizes="auto"
                        data-srcset={`${image}?w=400 400w, ${image}?w=800 800w, ${image}?w=1200 1200w`}
                        sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px"
                      />
                    )}
                  </div>
                </div>
              </LazyLoad>
            ))}
          </motion.div>
          <motion.div
            className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          </motion.div>
          <motion.div
            className="p-3 max-w-2xl mx-auto w-full post-content leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          ></motion.div>
          <div className="max-w-4xl mx-auto w-full">
            <CallToAction />
          </div>
        </>
      )}
    </motion.main>
  );
}
