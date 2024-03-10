import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";

function Header() {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [dropdownAdmin, setDropdownAdmin] = useState(false);

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [logoutApiCall] = useLogoutMutation()

  const mobileNav = () => {
    setOpen(!open);
  };

  const logoutHandler = async() => {
    try {
      await logoutApiCall()
      dispatch(logout())
      navigate('/login')
      setDropdown(false);
      setOpen(false);
    } catch (err) {
      console.log(err)
    }
  };

  const Admin = () => {
    return (<div
      className="md:text-emerald-300 group-hover:font-bold duration-200
            text-emerald-100 text-xl md:text-md my-3 relative"
    >
      admin
      <i
        onClick={() => setDropdownAdmin(!dropdownAdmin)}
        className="fa-solid fa-ellipsis-vertical ml-2 cursor-pointer"
      ></i>
      {dropdownAdmin && (
        <ul className="absolute top-9 right-[-15px] bg-zinc-50 shadow-lg p-2 w-[80px] duration-200 rounded-sm">
          <li
            className="text-zinc-600 text-[15px] hover:font-bold"
            onClick={() => {
              setOpen(false);
              setDropdownAdmin(false);
            }}
          >
            <Link to={"/admin/productlist"}>Products</Link>
          </li>
          <li
            className="text-zinc-600 text-[15px] hover:font-bold"
            onClick={() => {
              setOpen(false);
              setDropdownAdmin(false);
            }}
          >
            <Link to={"/admin/userlist"}>Users</Link>
          </li>
          <li
            className="text-zinc-600 text-[15px] hover:font-bold"
            onClick={() => {
              setOpen(false);
              setDropdownAdmin(false);
            }}
          >
            <Link to={"/admin/orderlist"}>Orders</Link>
          </li>
        </ul>
      )}
    </div>);
  };

  const Search = () => {
    return (
      <div className="relative w-4/5 sm:w-1/2">
        <input
          placeholder="Search Products ...."
          type="text"
          className="p-2 px-4 text-left text-zinc-600 bg-zinc-50 border border-zinc-600 
          placeholder:text-xs placeholder:text-left focus:outline-none w-full rounded-xl"
        />
        <button
          type="submit"
          className="absolute top-0 right-0 bg-emerald-500 w-9 h-full rounded-r-xl border border-zinc-600"
        >
          <i className="fa-solid fa-magnifying-glass text-sm text-zinc-100"></i>
        </button>
      </div>
    );
  };

  const Links = () => {
    return (
      <div className="flex items-center md:flex-row flex-col my-2">
        <Link
          to="/cart"
          className="text-emerald-50 md:hover:text-emerald-400 hover:font-bold hover:cursor-pointer duration-200
            text-xl md:text-md hover:text-emerald-100 my-3"
        >
          <i className="fa-solid fa-cart-shopping text-sm mr-0.5"></i>
          <span>Cart</span>
          {cartItems.length > 0 && (
            <span className="px-2 py-1 ml-1 text-sm text-white font-bold bg-emerald-500 rounded-full">
              {cartItems.reduce((a, c) => a + c?.qty, 0)}
            </span>
          )}
        </Link>
        {userInfo ? (
          <div
            className="mx-4 md:text-emerald-300 group-hover:font-bold duration-200
            text-emerald-100 text-xl md:text-md my-3 relative"
          >
            {userInfo.name}
            <i
              onClick={() => setDropdown(!dropdown)}
              className="fa-solid fa-ellipsis-vertical ml-2 cursor-pointer"
            ></i>
            {dropdown && (
              <ul className="absolute top-9 right-[-15px] bg-zinc-50 shadow-lg p-2 w-[80px] duration-200 rounded-sm">
                <li
                  className="text-zinc-600 text-[15px] hover:font-bold"
                  onClick={() => {
                    setOpen(false);
                    setDropdown(false);
                  }}
                >
                  <Link to={"/profile"}>Profile</Link>
                </li>
                <li
                  onClick={logoutHandler}
                  className="text-zinc-600 text-[15px] cursor-pointer hover:font-bold"
                >
                  Logout
                </li>
              </ul>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="mx-4 md:text-emerald-300 hover:font-bold hover:cursor-pointer duration-200
            text-emerald-100 text-xl md:text-md my-3"
          >
            <i className="fa-solid fa-user text-sm mr-0.5"></i>
            <span>Sign In</span>
          </Link>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-10 flex items-center justify-around bg-zinc-600 py-2 ">
        <Link
          to="/"
          className="font-allura text-lg font-bold text-zinc-50 w-[30%] mx-8"
        >
          MERN Shop
        </Link>
        <div className="hidden lg:flex justify-around items-center w-[70%]">
          <Search />
          <Links />
          {userInfo && userInfo.isAdmin && <Admin/>}
          
        </div>
        <div
          className="lg:hidden cursor-pointer mr-4 text-zinc-100"
          onClick={mobileNav}
        >
          {!open ? (
            <i className="fa-solid fa-bars"></i>
          ) : (
            <i className="fa-solid fa-xmark"></i>
          )}
        </div>
      </div>

      <div
        className={`absolute left-0  bg-zinc-400 w-full h-full flex flex-col
                    items-center justify-center transition-all duration-500 ease-in
                    ${open ? "top-0" : "top-[-100%]"} lg:top-[-100%]`}
      >
        <Search />
        <Links />
        {userInfo && userInfo.isAdmin && <Admin/>}
      </div>
    </>
  );
}

export default Header;
