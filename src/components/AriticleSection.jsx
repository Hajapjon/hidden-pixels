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
  return (
    <>
      {/*search & filter*/}
      <div className="h-[64px] flex items-center p-4 font-semibold text-2xl leading-8 text-[#26231E] font-[Poppins]">
        Latest articles
      </div>
      <div className="w-screen h-[172px] p-4 bg-[#EFEEEB] flex flex-col gap-4 lg:hidden">
        {/* search bar */}
        <Input />
        <div className="absolute top-188 right-8">
          <img src={search} alt="search icon" />
        </div>
        <div className="h-[76px] flex flex-col gap-1">
          <div className="font-[Poppins] font-medium leading-6 text-[#75716B]">
            Category
          </div>
          {/* selector */}
          <Select>
            <SelectTrigger className="w-full bg-white font-[Poppins] text-[#75716B] font-medium !h-[48px] text-[16px]">
              <SelectValue placeholder="Highlight" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* desktop selector */}
      <div className="hidden lg:flex lg:justify-between lg:w-full lg:h-[80px] lg:items-center lg:bg-[#EFEEEB]">
        <div className="hidden lg:flex lg:items-center lg:justify-around lg:gap-2 lg:w-[438px] lg:text-[16px] lg:font-medium lg:font-[Poppins] lg:text-[#43403B] lg:ml-10">
          <a href="" className="hover:bg-[#DAD6D1] p-3 rounded-xl">
            Highlight
          </a>
          <a href="" className="hover:bg-[#DAD6D1] p-3 rounded-xl">
            Cat
          </a>
          <a href="" className="hover:bg-[#DAD6D1] p-3 rounded-xl">
            Inspiration
          </a>
          <a href="" className="hover:bg-[#DAD6D1] p-3 rounded-xl">
            General
          </a>
        </div>
        {/* search bar */}
        <div className="hidden lg:flex lg:w-[360px] lg:mr-10 items-center">
          <Input />
          <div className="hidden lg:block absolute right-15">
            <img src={search} alt="search icon" />
          </div>
        </div>
      </div>

      {/* Blog posts card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BlogCard
          image={blogPosts[0].image}
          category={blogPosts[0].category}
          title={blogPosts[0].title}
          description={blogPosts[0].description}
          author={blogPosts[0].author}
          date={blogPosts[0].date}
        />
        <BlogCard
          image={blogPosts[1].image}
          category={blogPosts[1].category}
          title={blogPosts[1].title}
          description={blogPosts[1].description}
          author={blogPosts[1].author}
          date={blogPosts[1].date}
        />
        <BlogCard
          image={blogPosts[2].image}
          category={blogPosts[2].category}
          title={blogPosts[2].title}
          description={blogPosts[2].description}
          author={blogPosts[2].author}
          date={blogPosts[2].date}
        />
        <BlogCard
          image={blogPosts[3].image}
          category={blogPosts[3].category}
          title={blogPosts[3].title}
          description={blogPosts[3].description}
          author={blogPosts[3].author}
          date={blogPosts[3].date}
        />
        <BlogCard
          image={blogPosts[4].image}
          category={blogPosts[4].category}
          title={blogPosts[4].title}
          description={blogPosts[4].description}
          author={blogPosts[4].author}
          date={blogPosts[4].date}
        />
        <BlogCard
          image={blogPosts[5].image}
          category={blogPosts[5].category}
          title={blogPosts[5].title}
          description={blogPosts[5].description}
          author={blogPosts[5].author}
          date={blogPosts[5].date}
        />
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
