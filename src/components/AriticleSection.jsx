import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import search from "../assets/icons/search.png";
import { blogPosts } from "@/data/blogPosts";
import BlogCard from "@/components/BlogCard";

function ArticleSection() {
  const categories = ["Highlight", "Cat", "Inspiration", "General"];

  return (
    <>
      {/*Article Bar*/}
      <div className="h-[64px] flex items-center p-4 font-semibold text-2xl leading-8 text-[#26231E] font-[Poppins]">
        Latest articles
      </div>
      <div className="w-screen h-[172px] p-4 bg-[#EFEEEB] flex flex-col gap-4 lg:hidden">
        {/* Mobile Search */}
        <Input />
        <div className="absolute top-188 right-8">
          <img src={search} alt="search icon" />
        </div>
        <div className="h-[76px] flex flex-col gap-1">
          <div className="font-[Poppins] font-medium leading-6 text-[#75716B]">
            Category
          </div>
          {/*Mobile Selector */}
          <Select>
            <SelectTrigger className="w-full bg-white font-[Poppins] text-[#75716B] font-medium !h-[48px] text-[16px]">
              <SelectValue placeholder="Highlight" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((categorie, index) => (
                <SelectItem key={index} value={categorie}>
                  {categorie}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Desktop Selector */}
      <div className="hidden lg:flex lg:justify-between lg:w-full lg:h-[80px] lg:items-center lg:bg-[#EFEEEB]">
        <div className="hidden lg:flex lg:items-center lg:justify-around lg:gap-2 lg:w-[438px] lg:text-[16px] lg:font-medium lg:font-[Poppins] lg:text-[#43403B] lg:ml-10">
          {categories.map((categorie, index) => (
            <button
              key={index}
              className=" p-3 rounded-xl hover:cursor-pointer hover:bg-[#DAD6D1]"
            >
              {categorie}
            </button>
          ))}
        </div>
        {/* Deasktop Search */}
        <div className="hidden lg:flex lg:w-[360px] lg:mr-10 items-center">
          <Input />
          <div className="hidden lg:block absolute right-15">
            <img src={search} alt="search icon" />
          </div>
        </div>
      </div>

      {/* Blog posts card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogPosts.map((post, index) => (
          <BlogCard
            key={index}
            image={post.image}
            category={post.category}
            title={post.title}
            description={post.description}
            author={post.author}
            date={post.date}
          />
        ))}
      </div>
      {/* View more */}
      <div className="flex justify-center p-8">
        <a
          href=""
          className="underline text-[16px] font-[Poppins] font-medium leading-[24px]"
        >
          View more
        </a>
      </div>
    </>
  );
}

export default ArticleSection;
