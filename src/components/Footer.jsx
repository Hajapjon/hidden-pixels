import linkedin from "../assets/icons/linkedin.png";
import github from "../assets/icons/github.png";
import google from "../assets/icons/google.png";
export function Footer() {
  return (
    <>
      <footer className="w-full h-[152px] flex flex-col items-center justify-center gap-2 bg-[#EFEEEB] md:flex-row md:justify-between md:px-28">
        <div className="flex gap-6 items-center">
          <div className="font-medium leading-6 text-[#43403B]">
            Get in touch
          </div>
          <a href="">
            <img src={linkedin} alt="logo" />
          </a>
          <a href="">
            <img src={github} alt="logo" />
          </a>
          <a href="">
            <img src={google} alt="logo" />
          </a>
        </div>
        <a
          href=""
          className="text-[#26231E] font-medium leading-6 underline underline-offset-0  decoration-gray-500"
        >
          Home page
        </a>
      </footer>
    </>
  );
}
