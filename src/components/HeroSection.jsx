import authorImage from "../assets/images/authorImage.png";

function HeroSection() {
  return (
    <div className="bg-[#F9F8F6]  flex items-center justify-center py-6">
      <div className="flex flex-col items-center text-center p-6 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-12 lg:w-[1200px] lg:text-left text-[#26231E]">

        {/* Left: Text */}
        <div className="max-w-md lg:text-right">
          <h1 className="text-3xl lg:text-5xl font-semibold uppercase text-[#26231E]">
            Stay Informed, Stay Inspired
          </h1>
          <p className="mt-4 text-[#75716B] font-medium">
            Discover a World of Knowledge at Your Fingertips. Your Daily Dose of Inspiration and Information.
          </p>
        </div>

        {/* Center: Image */}
        <div className="my-6 lg:my-0">
          <img
            src={authorImage}
            alt="author"
            className="rounded-xl w-full max-w-xs sm:max-w-sm lg:max-w-[300px] xl:max-w-[360px] object-cover"
          />
        </div>

        {/* Right: Author Info */}
        <div className="text-[#43403B] max-w-md text-lg lg:text-[16px] lg:leading-relaxed font-[Poppins]">
          <p className="text-xs text-[#75716B] mb-1">-Author</p>
          <p className="font-semibold text-2xl mb-3">Thompson P.</p>
          <p className="mt-3 font-medium text-[#75716B]">
            I am a pet enthusiast and freelance writer who specializes in animal behavior and care. With a deep love for cats, I enjoy sharing insights on feline companionship and wellness.
          </p>
          <p className="mt-3 font-medium text-[#75716B]">
            When I’m not writing, I spend time volunteering at my local animal shelter, helping cats find loving homes.
          </p>
        </div>

      </div>
    </div>
  );
}

export default HeroSection;
