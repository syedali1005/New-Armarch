import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import PostCard from '../components/PostCard';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [carouselImages] = useState([
    {
      src: '/aat3-01-1-e1709530321931.webp',
      text: 'WHERE ARCHITECTURE\nMEETS\nSUSTAINABILITY',
    },
    {
      src: '/aat2-01-1-e1709530356401.webp',
      text: 'SUSTAINABLE DESIGNS,\nSUSTAINABLE\nFUTURE',
    },
    {
      src: '/DFH-01-1-e1709370667112.webp',
      text: 'SUSTAINABLE DESIGN,\nFUTURE\nBUILDINGS',
    },
  ]);

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

  const carouselSettings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const textVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const letterVariants = {
    initial: {
      y: '100%',
    },
    animate: {
      y: '0%',
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div className="bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-50 min-h-screen flex flex-col">
      <div className="carousel-container w-full flex-1 relative">
        <Slider {...carouselSettings}>
          {carouselImages.map((image, index) => (
            <div key={index} className="relative h-screen">
              <div
                className="w-full h-full bg-cover bg-center bg-fixed"
                style={{ backgroundImage: `url(${image.src})` }}
              ></div>
              <motion.div
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <motion.h2
                  className="hero-title text-stroke-2-gold text-3xl md:text-5xl lg:text-7xl font-semibold text-center whitespace-pre-line leading-tight"
                  style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}
                  variants={textVariants}
                  initial="initial"
                  animate="animate"
                >
                  {image.text.split('\n').map((line, lineIndex) => (
                    <motion.span key={lineIndex} variants={letterVariants}>
                      {line.split('').map((char, charIndex) => (
                        <span key={charIndex}>{char}</span>
                      ))}
                      {lineIndex < image.text.split('\n').length - 1 && <br />}
                    </motion.span>
                  ))}
                </motion.h2>
              </motion.div>
            </div>
          ))}
        </Slider>
      </div>
      <div className="max-w-6xl mx-auto px-6 py-10">
        <motion.h2
          className="md:text-5xl font-semibold text-center mb-20 text-stroke-2-gold hero-title1"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          Recent Projects
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 justify-center mt-10"
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
          className="text-center mt-8"
        >
          <Link
            to="/search"
            className="text-lg text-yellow-500 hover:underline inline-block border border-yellow-500 py-2 px-4 rounded-lg transition duration-300 ease-in-out hover:bg-yellow-500 hover:text-white"
          >
            View More
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
