import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import {
  FaRegThumbsUp,
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { IoCopyOutline } from "react-icons/io5";
import thomson from "../assets/images/thomson.png";
import NavBar from "../components/NavBar";
import { Footer } from "@/components/Footer";
import ReactMarkdown from "react-markdown";

function ViewPostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const isLoggedIn = false;
  const [likes, setLikes] = useState(321);

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await axios.get(`http://localhost:4001/posts/${id}`);
        setPost(res.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [id]);

  const handleCopyLink = () => {
    const link = window.location.href;
    navigator.clipboard.writeText(link);
    toast.success("ลิงก์ถูกคัดลอกไปที่ Clipboard แล้ว!");
  };

  const handleShare = (platform) => {
    const link = encodeURIComponent(window.location.href);
    let url = "";

    if (platform === "facebook") {
      url = `https://www.facebook.com/sharer/sharer.php?u=${link}`;
    } else if (platform === "twitter") {
      url = `https://twitter.com/intent/tweet?url=${link}`;
    } else if (platform === "linkedin") {
      url = `https://www.linkedin.com/sharing/share-offsite/?url=${link}`;
    }

    window.open(url, "_blank");
  };

  const handleLike = () => {
    if (!isLoggedIn) {
      alert("กรุณา Login ก่อนถึงจะกดไลก์ได้");
      return;
    }
    setLikes(likes + 1);
  };

  if (loading)
    return <div className="text-center p-8 text-gray-500">Loading...</div>;
  if (!post)
    return <div className="text-center p-8 text-red-500">Post not found</div>;

  return (
    <>
      <NavBar />
      <div className="max-w-6xl mx-auto p-4 sm:p-8">
        {/* Post Image */}
        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-[200px] md:h-[400px] object-cover rounded-lg mb-8"
          />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Content */}
          <div className="lg:col-span-2">
            {/* Tag + Date */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                {post.category || "General"}
              </span>
              <span>
                {new Date(post.date).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-[#26231E]">
              {post.title}
            </h1>

            {/* Description */}
            <p className="text-gray-600 text-base sm:text-lg mb-8">
              {post.description}
            </p>

            {/* Content */}
            <div className="markdown text-gray-800 leading-7 sm:leading-8 mb-10">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>

            {/* Action Buttons */}
            <div className="bg-[#F5F3F0] p-4 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleLike}
                  className="flex items-center gap-2 px-4 py-2 border border-black rounded-full hover:bg-gray-100"
                >
                  <FaRegThumbsUp />
                  <span>{likes}</span>
                </button>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={handleCopyLink}
                  className="flex items-center gap-2 px-4 py-2 border border-black rounded-full hover:bg-gray-100"
                >
                  <IoCopyOutline />
                  <span>Copy</span>
                </button>

                <button
                  onClick={() => handleShare("facebook")}
                  className="w-10 h-10 flex items-center justify-center border border-black rounded-full hover:bg-gray-100"
                >
                  <FaFacebookF />
                </button>

                <button
                  onClick={() => handleShare("linkedin")}
                  className="w-10 h-10 flex items-center justify-center border border-black rounded-full hover:bg-gray-100"
                >
                  <FaLinkedinIn />
                </button>

                <button
                  onClick={() => handleShare("twitter")}
                  className="w-10 h-10 flex items-center justify-center border border-black rounded-full hover:bg-gray-100"
                >
                  <FaTwitter />
                </button>
              </div>
            </div>

            {/* Comment Section */}
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-4">Comment</h2>
              <textarea
                className="w-full border rounded-lg p-4 mb-4 focus:outline-none focus:ring-2 focus:ring-black"
                rows="4"
                placeholder="What are your thoughts?"
                disabled={!isLoggedIn}
                onClick={() => {
                  if (!isLoggedIn) {
                    alert("กรุณา Login ก่อนถึงจะสามารถคอมเมนต์ได้");
                  }
                }}
              ></textarea>
              <div className="flex justify-end">
                <button
                  className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition"
                  onClick={() => {
                    if (!isLoggedIn) {
                      alert("กรุณา Login ก่อนถึงจะส่งคอมเมนต์ได้");
                    }
                  }}
                >
                  Send
                </button>
              </div>
            </div>
          </div>

          {/* Right Content (Author Profile) */}
          <div>
            <div className="bg-[#F5F3F0] rounded-xl p-6 shadow-md flex flex-col items-center">
              <img
                src={thomson}
                alt="Author"
                className="w-24 h-24 rounded-full object-cover mb-4"
              />
              <div className="text-center">
                <p className="text-gray-400 text-xs uppercase mb-1">Author</p>
                <h3 className="text-lg font-bold mb-2 text-[#26231E]">
                  {post.author || "Thompson P."}
                </h3>
                <p className="text-gray-600 text-sm">
                  I am a pet enthusiast and freelance writer who specializes in
                  animal behavior and care. With a deep love for cats, I enjoy
                  sharing insights on feline companionship and wellness. When
                  I'm not writing, I spend time volunteering at my local animal
                  shelter, helping cats find loving homes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ViewPostPage;
