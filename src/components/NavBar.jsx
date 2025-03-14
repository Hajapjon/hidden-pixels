import logo from "../assets/icons/logo.png";
import { useState } from "react";
function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav>
        <div className="w-full bg-[#303055] h-[60px] flex justify-between items-center lg:h-[80px]">
          <a href="">
          <img
            src={logo}
            alt="logo"
            className="w-[40px] h-[40px] m-3 lg:w-[60px] lg:h-[60px] lg:ml-20"
          />
          </a>
          <div className="lg:w-[276px] lg:h-[48px] lg:mr-25">
            <ul className="hidden lg:flex lg:justify-between">
              <li>
                <a
                  href="/login"
                  className="border rounded-full block py-3 text-center w-[127px] h-[48px] leading-6 text-[16px] text-[#303055] bg-[#e5dac7] hover:bg-[#f5ecde]  duration-300"
                >
                  Log in
                </a>
              </li>
              <li>
                <a
                  href="/signup"
                  className="border rounded-full block py-3 text-center w-[127px] h-[48px] leading-6 text-[16px] text-[#303055] bg-[#FFC212] hover:bg-[#ffd351] duration-300"
                >
                  Sign up
                </a>
              </li>
            </ul>
          </div>
          {/* mobile responsive*/}
          <div className="relative lg:hidden">
            {/* ปุ่ม Hamburger */}
            <button
              className="m-5 text-white text-xl cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              ☰
            </button>

            {/* เมนู */}
            {isOpen && (
              <div className="absolute z-10 top-16 right-0 bg-white shadow-lg p-2 w-screen text-center">
                <ul className="flex flex-col space-y-2">
                  <li>
                    <a
                      href="/login"
                      className="border rounded-full block p-2 bg-white hover:bg-gray-200"
                    >
                      Log in
                    </a>
                  </li>
                  <li>
                    <a
                      href="/signup"
                      className="border rounded-full block p-2 text-white bg-[#FFC212] hover:bg-[#303055]"
                    >
                      Sign up
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
