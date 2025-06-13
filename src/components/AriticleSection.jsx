import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import searchIcon from "../assets/icons/search.png";
import BlogCard from "@/components/BlogCard";

function formatDate(isoDate) {
  const options = { day: "2-digit", month: "long", year: "numeric" };
  return new Date(isoDate).toLocaleDateString("en-GB", options);
}

function ArticleSection() {
  const [categories, setCategories] = useState([{ id: null, name: "Highlight" }]); // ✅ เพิ่ม Highlight เป็น default
  const [category, setCategory] = useState("Highlight");
  const [keyword, setKeyword] = useState("");
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const limit = 6;

  // ✅ โหลด categories จาก Supabase
useEffect(() => {
  async function fetchCategories() {
    const { data, error } = await supabase.from("categories").select("*").order("id");
    if (!error) {
      setCategories([{ id: null, name: "Highlight" }, ...data]); // ✅ reset ใหม่ทุกครั้ง ไม่เบิ้ล
    }
  }

  fetchCategories();
}, []);


  // ✅ เปลี่ยนเป็นใช้ name → id
  const fetchPosts = async (selectedCategory, pageNum = 1, append = false, searchTerm = "") => {
    try {
      setLoading(true);

      const from = (pageNum - 1) * limit;
      const to = from + limit - 1;

      let query = supabase
        .from("posts")
        .select("*, categories(name)")
        .order("date", { ascending: false })
        .range(from, to);

      const selected = categories.find((cat) => cat.name === selectedCategory);

      if (selected?.id) {
        query = query.eq("category_id", selected.id); // ✅ filter ด้วย category_id จากชื่อ
      }

      if (searchTerm) {
        query = query.ilike("title", `%${searchTerm}%`);
      }

      const { data, error } = await query;

      if (error) {
        console.error("❌ Supabase error:", error);
        return;
      }

      const newPosts = data.map((post) => ({
        ...post,
        category: post.categories?.name || post.category,
        date: formatDate(post.date),
      }));

      setPosts((prev) => (append ? [...prev, ...newPosts] : newPosts));
      setHasMore(newPosts.length === limit);
    } catch (error) {
      console.error("❌ Unexpected error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    fetchPosts(category, 1, false, keyword);
  }, [category, keyword, categories]);

  const handleCategoryChange = (value) => {
    setCategory(value);
  };

  const handleViewMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchPosts(category, nextPage, true, keyword);
  };

  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
  };

  return (
    <>
      {/* Article Bar */}
      <div className="h-[64px] flex items-center p-4 font-semibold text-2xl leading-8 text-[#26231E] bg-[#F9F8F6]">
        Latest articles
      </div>

      {/* Mobile Filter */}
      <div className="w-screen h-auto p-4 bg-[#EFEEEB] flex flex-col gap-4 lg:hidden">
        <div className="relative">
          <Input
            value={keyword}
            onChange={handleSearchChange}
            placeholder="Search articles..."
          />
          <img src={searchIcon} alt="search icon" className="absolute right-4 top-3 w-6 h-6" />
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
                <SelectItem key={item.name} value={item.name}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Desktop Filter */}
      <div className="hidden lg:flex lg:justify-between lg:w-full lg:h-[80px] lg:items-center lg:bg-[#EFEEEB] p-4">
        <div className="flex gap-4">
          {categories.map((item) => (
            <button
              key={item.name}
              className={`${
                category === item.name
                  ? "bg-[#DAD6D1] text-[#43403B]"
                  : "bg-[#EFEEEB] hover:bg-[#DAD6D1]"
              } px-4 py-2 rounded-[8px] hover:cursor-pointer font-medium`}
              disabled={category === item.name}
              onClick={() => handleCategoryChange(item.name)}
            >
              {item.name}
            </button>
          ))}
        </div>
        <div className="relative w-[360px]">
          <Input
            value={keyword}
            onChange={handleSearchChange}
            placeholder="Search articles..."
          />
          <img src={searchIcon} alt="search icon" className="absolute right-4 top-3 w-6 h-6" />
        </div>
      </div>

      {/* Blog Post Cards */}
      <div className="px-4 max-w-screen-xl mx-auto bg-[#F9F8F6]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
          {posts.map((post) => (
            <Link key={post.id} to={`/posts/${post.id}`}>
              <BlogCard
                id={post.id}
                image={post.image}
                category={post.category}
                title={post.title}
                description={post.description}
                author={post.author}
                date={post.date}
              />
            </Link>
          ))}
        </div>
      </div>

      {/* View More */}
      {hasMore && (
        <div className="flex justify-center p-8 bg-[#F9F8F6]">
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
