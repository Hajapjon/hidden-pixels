import easterEgg from "../assets/images/easterEgg.jpg";

function HeroSection() {
  return (
    <>
    <div className="lg:h-[800px] lg:flex lg:justify-center lg:items-center bg-[#46467A]">
    <div className="h-[600px] flex flex-col lg:flex-row lg:justify-between justify-center items-center text-center bg-[#46467A] text-white p-6 lg:h-[600px] lg:w-[1300px] lg:gap-10">
      <div>
        <h1 className="text-3xl lg:text-5xl font-bold uppercase bg-gradient-to-b from-[#44c1ff] to-[#eb678a] bg-clip-text text-transparent drop-shadow-lg font-['Press_Start_2P']">
          Hidden
        </h1>
        <h1 className="text-3xl lg:text-5xl font-bold uppercase text-[#57C7FF] drop-shadow-lg font-['Press_Start_2P']">
          Pixels
        </h1>
        <p className="mt-4 text-lg lg:text-xl max-w-2xl text-[#E0DFFD] drop-shadow-lg font-[Poppins]">
          Where Games Hide Their Secrets
        </p>
      </div>
      {/* hero image */}
      <div >
        <img
          src={easterEgg}
          alt="easter egg"
          className="mt-4 w-full h-auto rounded-3xl max-w-xs sm:max-w-sm lg:max-w-lg xl:max-w-xl object-contain"
        />
      </div>
      <div className="mt-4 text-lg lg:text-xl max-w-2xl text-[#E0DFFD] lg:w-[347px] lg:h-[347px] lg:flex lg:items-center lg:justify-center font-[Poppins]">
      <p>
        Explore legendary Easter Eggs, forgotten gems, and mind-blowing hidden
        details in gaming history.
      </p>
      </div>
    </div>

    </div>
    
    </>
  );
}

export default HeroSection;
