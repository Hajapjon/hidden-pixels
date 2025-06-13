import logo from "../assets/icons/logo2.svg";
import profileIcon from "../assets/icons/logo.png"; // fallback profile pic
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-[#F9F8F6] border-b border-[#DAD6D1]">
      <div className="h-[60px] lg:h-[80px] flex justify-between items-center px-4 lg:px-20">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="logo" className="h-8 lg:h-10" />
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center space-x-4">
          {!user ? (
            <>
              <Link
                to="/login"
                className="border rounded-full py-3 w-[127px] font-medium border-[#75716B] text-center text-[16px] text-[#26231E] hover:bg-[#f8f6f4] hover:text-[#75716B] transition-colors duration-200"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="border rounded-full py-3 w-[127px] text-center font-medium bg-[#26231E] text-white hover:bg-[#75716B] transition-colors duration-200"
              >
                Sign up
              </Link>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2"
              >
                <img
                  src={user.profile_pic || profileIcon}
                  alt="avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="text-[#303055]">{user.name || user.username}</span>
                <span className="text-[#303055]">▾</span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md py-2 w-40 z-50">
                  <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-gray-100">
                    Profile
                  </Link>
                  <Link to="/reset-password" className="block px-4 py-2 text-sm hover:bg-gray-100">
                    Reset password
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <div className="lg:hidden">
          <button
            className="text-[#75716B] text-xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu - placed outside main container */}
      {isOpen && (
        <div className="absolute top-[61px] left-0 right-0 bg-[#F9F8F6] shadow-md z-40 py-6 px-6 lg:hidden">
          <ul className="flex flex-col space-y-4 text-sm text-center">
            {!user ? (
              <>
                <li>
                  <Link
                    to="/login"
                    className="block rounded-full font-medium border border-[#75716B] py-2 px-4 text-[#26231E] hover:bg-[#f8f6f4] hover:text-[#75716B] transition-colors duration-200"
                  >
                    Log in
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    className="block rounded-full font-medium bg-[#26231E] text-white py-2 px-4 hover:bg-[#75716B] transition-colors duration-200"
                  >
                    Sign up
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="font-semibold text-[#303055]">
                  {user.name || user.username}
                </li>
                <li>
                  <Link to="/profile" className="block py-2 px-4 hover:bg-gray-100">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="/reset-password" className="block py-2 px-4 hover:bg-gray-100">
                    Reset password
                  </Link>
                </li>
                <li>
                  <button
                    onClick={logout}
                    className="block w-full text-center py-2 px-4 text-red-600 hover:bg-gray-100"
                  >
                    Log out
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
