function Card({ picture, category, title, body, profilePicture, author, date }) {
  return (
    <>
      <a href="">
        <div className="flex flex-col items-center justify-center p-6 gap-4 font-[Poppins] lg:w-[590px]">
          <img src={picture} alt="card picture" />
          <div className="flex flex-col gap-4">
            <div className="text-[#12B279] bg-[#D7F2E9] w-[50px] h-[30px] flex items-center justify-center rounded-full font-medium text-[14px] leading-[22px]">
              {category}
            </div>
            <div className="text-[#26231E] font-semibold text-[20px] leading-[28px] h-[84px]">
              {title}
            </div>
            <div className="text-[#75716B] h-[44px] overflow-y-hidden font-medium text-[14px] leading-[22px]">
              {body}
            </div>
            <div className="flex gap-4">
              <img src={profilePicture} alt="" className="w-[24px] h-[24px] rounded-full" />
              <div className="text-[#43403B]">{author}</div>
              <div className="text-[#DAD6D1]">|</div>
              <div className="text-[#75716B]">{date}</div>
            </div>
          </div>
        </div>
      </a>
    </>
  );
}

export default Card;
