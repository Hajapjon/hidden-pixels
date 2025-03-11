import easterEgg from "../assets/images/easterEgg.jpg";

function HeroSection() {
  return (
    <>
    <div className="md:h-[800px] md:flex md:justify-center md:items-center bg-[#46467A]">
    <div className="h-[600px] flex flex-col md:flex-row md:justify-between justify-center items-center text-center bg-[#46467A] text-white p-6 md:h-[600px] md:w-[1300px]">
      <div>
        <h1 className="text-4xl md:text-6xl font-bold uppercase bg-gradient-to-b from-[#44c1ff] to-[#eb678a] bg-clip-text text-transparent drop-shadow-lg">
          Hidden
        </h1>
        <h1 className="text-4xl md:text-6xl font-bold uppercase text-[#57C7FF] drop-shadow-lg">
          Pixels
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl text-[#E0DFFD] drop-shadow-lg">
          Where Games Hide Their Secrets
        </p>
      </div>
      <div >
        <img
          src={easterEgg}
          alt="easter egg"
          className="mt-4 rounded-3xl md:h-[529px]"
        />
      </div>
      <div className="mt-4 text-lg md:text-xl max-w-2xl text-[#E0DFFD] md:w-[347px] md:h-[347px] md:flex md:items-center md:justify-center">
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
