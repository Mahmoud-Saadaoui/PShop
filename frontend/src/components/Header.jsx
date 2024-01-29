import React, { useState } from "react";

function Header() {
  const [open, setOpen] = useState(false);
  const mobileNav = () => {
    setOpen(!open);
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
        <div
          className="text-emerald-50 md:hover:text-emerald-400 hover:font-bold hover:cursor-pointer duration-200
            text-xl md:text-md hover:text-emerald-100 my-3"
        >
          <i className="fa-solid fa-cart-shopping text-sm mr-0.5"></i>
          <span>Cart</span>
        </div>
        <div
          className="mx-4 md:text-emerald-300 hover:font-bold hover:cursor-pointer duration-200
          text-emerald-100 text-xl md:text-md my-3"
        >
          <i className="fa-solid fa-user text-sm mr-0.5"></i>
          <span>Sign In</span>
        </div>
      </div>
    );
  };
  return (
    <>
      <div className="fixed top-0 left-0 w-full z-10 flex items-center justify-around bg-zinc-600 py-2 ">
        <div className="font-allura text-lg font-bold text-zinc-50 w-[30%] mx-8">
          MERN Shop
        </div>
        <div className="hidden md:flex justify-around items-center w-[70%]">
          <Search/>
          <Links/>
        </div>
        <div
          className="md:hidden cursor-pointer mr-4 text-zinc-100"
          onClick={mobileNav}
        >
          {!open ? (
            <i className="fa-solid fa-bars"></i>
          ) : (
            <i className="fa-solid fa-xmark"></i>
          )}
        </div>
      </div>

      <div className={`absolute left-0  bg-zinc-400 w-full h-full flex flex-col
                    items-center justify-center transition-all duration-500 ease-in
                    ${open ? "top-0" : "top-[-100%]"} md:top-[-100%]`}
      >
        <Search/>
        <Links/>
      </div>
    </>
  );
}

export default Header;
