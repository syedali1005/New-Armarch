import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Spinner } from 'flowbite-react';
import CallToAction from '../components/CallToAction';
import LazyLoad from 'react-lazyload';
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const PostPage = () => {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

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
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);

  const openImage = (index) => {
    setSelectedImageIndex(index);
  };

  const closeImage = () => {
    setSelectedImageIndex(null);
  };

  const sliderSettings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: selectedImageIndex,
  };

  const handleModalClick = (event) => {
    event.stopPropagation();
  };

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
                  className="max-w-md w-full md:max-w-lg transform transition-transform hover:scale-105 cursor-pointer"
                  onClick={() => openImage(index)}
                >
                  <div
                    className="w-full h-auto object-cover rounded-lg shadow-md bg-gray-200"
                    style={{ minHeight: '270px' }}
                  >
                    <img
                      src={image}
                      alt={`Image ${index}`}
                      loading="lazy"
                      className="w-full h-auto object-cover rounded-lg shadow-md"
                    />
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
          {selectedImageIndex !== null && (
            <div className="custom-modal-overlay" onClick={closeImage}>
              <div className="custom-modal-body" onClick={handleModalClick}>
                <Slider {...sliderSettings}>
                  {post.images.map((image, index) => (
                    <div key={index} className="flex justify-center items-center">
                      <img
                        src={image}
                        alt={`Gallery Image ${index}`}
                        className="custom-modal-image object-contain max-h-screen max-w-full"
                      />
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          )}
        </>
      )}
    </motion.main>
  );
};

export default PostPage;
