import { Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CallToAction from "../components/CallToAction";

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
        if (res.ok) {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);

  const fadeInAnimation = {
    opacity: loading ? 0 : 1,
    transition: "opacity 0.5s ease-in-out",
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      {post && (
        <>
          <h1
            className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4x"
            style={fadeInAnimation}
          >
            {post.title}
          </h1>
          <Link
            to={`/search?category=${post.category}`}
            className="self-center mt-5"
            style={fadeInAnimation}
          >
            <Button color="gray" pill size="xs" className="animate-pulse">
              {post.category}
            </Button>
          </Link>
          <div
            className="image-container relative overflow-hidden rounded-lg"
            style={fadeInAnimation}
          >
            <img
              src={post.image}
              alt={post.title}
              className="max-h-full max-w-full object-cover rounded-lg mt-16"
              style={fadeInAnimation}
            />
            <div className="border-animation"></div>
          </div>
          <div
            className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs"
            style={fadeInAnimation}
          >
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>
          <div
            className="p-3 max-w-2xl mx-auto w-full post-content leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
            style={fadeInAnimation}
          >
          </div>
          <div className="max-w-4xl mx-auto w-full">
            <CallToAction />
          </div>
        </>
      )}
    </main>
  );
}