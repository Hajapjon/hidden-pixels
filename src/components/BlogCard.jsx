import thomson from "../assets/images/thomson.png";
import { Link } from "react-router-dom";
function BlogCard({ id, image, category, title, description, author, date }) {
  return (
    <div className="flex flex-col items-center justify-center p-6 gap-4 font-[Poppins] mt-3">
      <Link
  to={`/posts/${id}`}
  className="relative block w-full overflow-hidden rounded-md aspect-[16/9]"
>
  <img
    src={image}
    alt="card picture"
    className="w-full h-full object-cover"
  />
</Link>
      <div className="flex flex-col gap-4">
        <div className="flex">
          <span className="text-[#12B279] bg-[#D7F2E9] rounded-full font-medium text-[14px] leading-[22px] px-3 py-1">
            {category}
          </span>
        </div>
        <Link to={`/posts/${id}`}>
          <h2 className="text-[#26231E] font-semibold text-[20px] leading-[28px] h-[84px] line-clamp-2 hover:underline">
            {title}
          </h2>
        </Link>
        <p className="text-muted-foreground text-sm mb-4 flex-grow line-clamp-3">
          {description}
        </p>
        <div className="flex gap-4 items-center text-sm">
          <img
            src={thomson}
            alt="Tomson P."
            className="w-8 h-8 rounded-full mr-2"
          />
          <span className="text-[#43403B]">{author}</span>
          <span className="text-[#DAD6D1]">|</span>
          <span className="text-[#75716B]">{date}</span>
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
