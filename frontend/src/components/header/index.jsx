import { useContext, useState } from "react";
import Dropdown from "./Dropdown";
import { FaShoppingBag } from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi";
import { Link } from "react-router-dom";
import Logo from "../Logo";
import { AppContext } from "../../context/appContext";

const Header = () => {
  const { auth } = useContext(AppContext)
  const [openNav, setOpenNav] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="flex justify-between items-center px-4 md:px-10 py-4 shadow-md bg-white text-gray-900 relative z-20">
      {/* Logo */}
      <Logo size="md" />

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-8 text-lg  text-gray-700">
        <Link to="/" className="font-medium hover:text-rose-500 transition">
          Home
        </Link>
        <Link
          to="/products"
          className="font-medium hover:text-rose-500 transition"
        >
          Explore Products
        </Link>
        <div className="flex items-center space-x-2 cursor-pointer hover:text-rose-500 transition">
          <span className="font-medium">Cart</span>
          <FaShoppingBag />
        </div>
      </nav>

      {/* Right icons */}
      <div className="flex items-center space-x-6 relative">
        {/* Hamburger */}
        <div
          className="md:hidden cursor-pointer"
          onClick={() => setOpenNav(!openNav)}
        >
          <div
            className={`bg-gray-800 w-6 h-0.5 rounded-sm transition-transform duration-300 ${
              openNav ? "rotate-45 translate-y-1.5" : ""
            }`}
          />
          <div
            className={`bg-black w-6 h-0.5 my-1 rounded-sm transition-opacity duration-300 ${
              openNav ? "opacity-0" : ""
            }`}
          />
          <div
            className={`bg-black w-6 h-0.5 rounded-sm transition-transform duration-300 ${
              openNav ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          />
        </div>
        {/* <div className="flex items-center">
          <img
            src="https://i.pravatar.cc/32"
            alt="avatar"
            className="w-8 h-8 rounded-full object-cover border"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          />
        </div> */}
        {auth ? (
          <div className="flex items-center">
            <img
              src={auth.img_url}
              alt="avatar"
              className="w-8 h-8 rounded-full object-cover border"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
          </div>
        ) : (
          <Link to="/login" className="">
            Login
          </Link>
        )}

        {dropdownOpen && (
          <Dropdown auth={auth} setDropdownOpen={setDropdownOpen} />
        )}
      </div>

      {/* Mobile Menu */}
      <div
        className={`absolute top-full left-0 right-0 bg-white shadow-md md:hidden flex flex-col items-center text-gray-700 transition-all duration-500 overflow-hidden ${
          openNav ? "max-h-40 py-4" : "max-h-0 py-0"
        }`}
      >
        <Link to="/" className="text-lg mb-2 hover:text-rose-500 transition">
          Home
        </Link>
        <Link
          to="/products"
          className="text-lg mb-2 hover:text-rose-500 transition"
        >
          Explore Products
        </Link>
        <div className="flex items-center space-x-2 cursor-pointer text-lg hover:text-rose-500 transition">
          <span>Cart</span>
          <FaShoppingBag className="text-base" />
        </div>
      </div>
    </header>
  );
};

export default Header;
