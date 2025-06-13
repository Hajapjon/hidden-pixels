import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import {
  FaRegThumbsUp,
  FaThumbsUp,
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { IoCopyOutline } from "react-icons/io5";
import authorImage from "../assets/images/authorImage.png";
import ReactMarkdown from "react-markdown";

function ViewPostPage() {
  const { id } = useParams();
  const { user } = useAuth();

  const [post, setPost] = useState(null);
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from("posts")
        .select("*, categories(name)")
        .eq("id", id)
        .single();

      if (error) console.error(error);
      else {
        setPost({ ...data, category: data.categories?.name });
        setLikes(data.likes_count || 0);
      }

      if (user) {
        const { data: likeData } = await supabase
          .from("likes")
          .select("id")
          .eq("post_id", id)
          .eq("user_id", user.id)
          .single();
        setHasLiked(!!likeData);
      }

      const { data: commentData, error: commentError } = await supabase
  .from("comments")
  .select("comment_text, created_at, users(name, profile_pic)")
  .eq("post_id", id)
  .order("created_at", { ascending: false });

console.log("🧪 commentData:", commentData);
console.log("🧪 commentError:", commentError);



      if (commentData) setComments(commentData);
      setLoading(false);
    }
    

    fetchData();
  }, [id, user]);

  const handleLikeToggle = async () => {
    if (!user) return alert("Please log in first");

    if (hasLiked) {
      await supabase
        .from("likes")
        .delete()
        .eq("post_id", id)
        .eq("user_id", user.id);
      await supabase
        .from("posts")
        .update({ likes_count: likes - 1 })
        .eq("id", id);
      setLikes(likes - 1);
      setHasLiked(false);
    } else {
      await supabase.from("likes").insert({ post_id: id, user_id: user.id });
      await supabase
        .from("posts")
        .update({ likes_count: likes + 1 })
        .eq("id", id);
      setLikes(likes + 1);
      setHasLiked(true);
    }
  };

  const handleComment = async () => {
    if (!user) return alert("Please log in first");
    if (!comment.trim()) return toast.warning("Please write a comment first");

    const { error } = await supabase.from("comments").insert({
      post_id: id,
      user_id: user?.id,
      comment_text: comment,
    });

    if (!error) {
      setComments([
        {
          comment_text: comment,
          created_at: new Date().toISOString(),
          users: {
            name: user.name || user.username,
            profile_pic: user.profile_pic || "/default-avatar.png",
          },
        },
        ...comments,
      ]);
      setComment("");
      toast.success("Comment submitted!");
    } else toast.error("Failed to send comment");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard");
  };

  const handleShare = (platform) => {
    const link = encodeURIComponent(window.location.href);
    let url = "";
    if (platform === "facebook")
      url = `https://www.facebook.com/sharer/sharer.php?u=${link}`;
    if (platform === "twitter")
      url = `https://twitter.com/intent/tweet?url=${link}`;
    if (platform === "linkedin")
      url = `https://www.linkedin.com/sharing/share-offsite/?url=${link}`;
    window.open(url, "_blank");
  };

  if (loading)
    return <div className="text-center py-10 text-gray-500">Loading...</div>;
  if (!post)
    return <div className="text-center py-10 text-red-500">Post not found</div>;

  return (
    <div className="mt-[60px] lg:mt-[80px] max-w-6xl mx-auto p-4 sm:p-8">
      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-[200px] md:h-[400px] object-cover rounded-lg mb-8"
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        <div className="lg:col-span-2">
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
              {post.category || "General"}
            </span>
            <span>
              {new Date(post.date).toLocaleDateString("en-En", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-[#26231E]">
            {post.title}
          </h1>
          <p className="text-gray-600 text-base sm:text-lg mb-8">
            {post.description}
          </p>
          <div className="markdown text-gray-800 leading-7 sm:leading-8 mb-10">
            <ReactMarkdown>
              {post.content?.replaceAll("\\n", "\n")?.replaceAll("\n", "  \n")}
            </ReactMarkdown>
          </div>

          <div className="bg-[#F5F3F0] p-4 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
            <button
              onClick={handleLikeToggle}
              className="flex items-center gap-2 px-4 py-2 border border-black rounded-full hover:bg-gray-100"
            >
              {hasLiked ? <FaThumbsUp /> : <FaRegThumbsUp />} <span>{likes}</span>
            </button>

            <div className="flex items-center gap-4">
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-2 px-4 py-2 border border-black rounded-full hover:bg-gray-100"
              >
                <IoCopyOutline /> <span>Copy</span>
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

          {/* Comment Input */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4">Comments</h2>
            <textarea
              className="w-full border rounded-lg p-4 mb-4 focus:outline-none focus:ring-2 focus:ring-black"
              rows="3"
              placeholder="What are your thoughts?"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              disabled={!user}
            />
            <div className="flex justify-end">
              <button
                className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition"
                onClick={handleComment}
              >
                Send
              </button>
            </div>
          </div>

          {/* Comment List */}
          <div className="mt-6 space-y-6">
            {comments.length === 0 && null}
            {comments.map((c, i) => (
              <div key={i} className="pb-6 border-b border-gray-200">
                <div className="flex items-start space-x-4">
                  <img
                    src={c.users?.profile_pic || "/default-avatar.png"}
                    alt={c.users?.name || "user"}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-[#26231E]">
                      {c.users?.name || "Unknown"}
                    </p>
                    <p className="text-xs text-gray-400 mb-2">
                      {new Date(c.created_at).toLocaleString("en-EN", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    <p className="text-gray-700 leading-6 whitespace-pre-wrap">
                      {c.comment_text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Author */}
        <div>
          <div className="bg-[#F5F3F0] rounded-xl p-6 shadow-md flex flex-col items-center">
            <img
              src={authorImage}
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
                sharing insights on feline companionship and wellness.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewPostPage;
