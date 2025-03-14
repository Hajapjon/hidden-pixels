import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import search from "../assets/icons/search.png";

function ArticleSection() {
  return (
    <>
      {/* mobile search & filter*/}

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
      {/* desktop search & filter */}
      {/* selector */}
      <div className="hidden lg:flex lg:justify-between lg:w-full lg:h-[80px] lg:items-center lg:bg-[#EFEEEB]">
        <div className="hidden lg:flex lg:items-center lg:justify-around lg:gap-2 lg:w-[438px] lg:text-[16px] lg:font-medium lg:font-[Poppins] lg:text-[#43403B] lg:ml-10">
          <a href="" className="hover:bg-[#DAD6D1] p-3 rounded-xl">Highlight</a>
          <a href="" className="hover:bg-[#DAD6D1] p-3 rounded-xl">Cat</a>
          <a href="" className="hover:bg-[#DAD6D1] p-3 rounded-xl">Inspiration</a>
          <a href="" className="hover:bg-[#DAD6D1] p-3 rounded-xl">General</a>
        </div>
        {/* search bar */}
        <div className="hidden lg:flex lg:w-[360px] lg:mr-10">
          <Input />
          <div className="hidden lg:block absolute right-15 bottom-[-50px]">
            <img src={search} alt="search icon" />
          </div>
        </div>
      </div>
    </>
  );
}

export default ArticleSection;
