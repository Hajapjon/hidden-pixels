import { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import search from "../assets/icons/search.png";
import BlogCard from "@/components/BlogCard";

function formatDate(isoDate) {
  const options = { day: "2-digit", month: "long", year: "numeric" };
  return new Date(isoDate).toLocaleDateString("en-GB", options);
}

function ArticleSection() {
  const categories = ["Highlight", "Cat", "Inspiration", "General"];
  const [category, setCategory] = useState("Highlight");
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const limit = 6;

  const fetchPosts = async (selectedCategory, pageNum = 1, append = false) => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:4001/posts", {
        params: {
          page: pageNum,
          limit,
          ...(selectedCategory !== "Highlight" && { category: selectedCategory }),
        },
      });

      const newPosts = res.data.data.map((post) => ({
        ...post,
        date: formatDate(post.date),
      }));

      setPosts((prev) => (append ? [...prev, ...newPosts] : newPosts));
      setHasMore(newPosts.length === limit);
    } catch (error) {
      console.error("❌ Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1); // reset page
    fetchPosts(category, 1, false);
  }, [category]);

  const handleCategoryChange = (value) => {
    setCategory(value);
  };

  const handleViewMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchPosts(category, nextPage, true);
  };

  return (
    <>
      {/* Article Bar */}
      <div className="h-[64px] flex items-center p-4 font-semibold text-2xl leading-8 text-[#26231E] font-[Poppins]">
        Latest articles
      </div>

      {/* Mobile Filter */}
      <div className="w-screen h-[172px] p-4 bg-[#EFEEEB] flex flex-col gap-4 lg:hidden">
        <Input />
        <div className="absolute top-188 right-8">
          <img src={search} alt="search icon" />
        </div>
        <div className="h-[76px] flex flex-col gap-1">
          <div className="font-[Poppins] font-medium leading-6 text-[#75716B]">
            Category
          </div>
          <Select value={category} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-full bg-white font-[Poppins] text-[#75716B] font-medium !h-[48px] text-[16px]">
              <SelectValue>{category}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {categories.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Desktop Filter */}
      <div className="hidden lg:flex lg:justify-between lg:w-full lg:h-[80px] lg:items-center lg:bg-[#EFEEEB]">
        <div className="hidden lg:flex lg:items-center lg:justify-around lg:gap-2 lg:w-[438px] lg:text-[16px] lg:font-medium lg:font-[Poppins] lg:text-[#43403B] lg:ml-10">
          {categories.map((item) => (
            <button
              key={item}
              className={`${
                category === item
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              } p-3 rounded-xl hover:cursor-pointer`}
              disabled={category === item}
              onClick={() => handleCategoryChange(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="hidden lg:flex lg:w-[360px] lg:mr-10 items-center">
          <Input />
          <div className="hidden lg:block absolute right-15">
            <img src={search} alt="search icon" />
          </div>
        </div>
      </div>

      {/* Blog Post Cards */}
      <div className="px-4 max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <BlogCard
              key={post.id}
              image={post.image}
              category={post.category}
              title={post.title}
              description={post.description}
              author={post.author}
              date={post.date}
            />
          ))}
        </div>
        
      </div>

      {/* View More */}
      { hasMore && (
        <div className="flex justify-center p-8">
          <button
            onClick={handleViewMore}
            className="underline text-[16px] font-[Poppins] font-medium leading-[24px] cursor-pointer"
          >
            {loading ? "Loading..." : "View more"}
          </button>
        </div>
      )}
    </>
  );
}

export default ArticleSection;
