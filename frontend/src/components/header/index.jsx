import { useContext, useState } from "react";
import Dropdown from "./Dropdown";
import { FaShoppingBag } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../Logo";
import { AppContext } from "../../context/appContext";
import { logoutApi } from "../../lib/api/authApi";
import { useMutation } from "@tanstack/react-query";
import Spinner from "../loaders/Spinner";
import Alert from "../Alert";

const Header = () => {
  const navigate = useNavigate()
  const { auth, logout } = useContext(AppContext)
  const [openNav, setOpenNav] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      logout();
      navigate('/')
    },
  });
  const logoutUser = () => {
    mutate();
  };
  if (isPending) {
    return <Spinner/>
  }
  return (
    <header className="flex justify-between items-center px-4 md:px-10 py-4 shadow-md bg-white text-gray-900 relative z-20">
      {
        isError && <Alert
        message={error.response.data.message || "Failed Logout"}
        type="error"
      />
      }
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
        {auth ? (
          <div className="flex items-center">
            <img
              src={auth.img_url}
              alt="avatar"
              className="w-8 h-8 rounded-full object-cover border cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
            {/* <span onClick={handleLogout}> Logout </span> */}
          </div>
        ) : (
          <Link to="/login" className="">
            Login
          </Link>
        )}

        {dropdownOpen && (
          <Dropdown
            auth={auth}
            setDropdownOpen={setDropdownOpen}
            logout={logoutUser}
            isError={isError}
          />
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
