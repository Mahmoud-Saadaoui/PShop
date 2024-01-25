import React from 'react'

function Nav({ open }) {
  return (
    <div className={`absolute left-0 z-0 bg-zinc-400 w-full h-full flex flex-col 
                      items-center justify-center `}
    >
        <div className="relative w-4/5 sm:w-1/2">
          <input
            placeholder="Search Products ...."
            type="text"
            className="p-2 px-4 text-left text-zinc-600 bg-zinc-50 border border-zinc-600 
                    placeholder:text-md placeholder:text-left focus:outline-none w-full rounded-xl"
          />
          <button
            type="submit"
            className="absolute top-0 right-0 bg-emerald-500 w-9 h-full rounded-r-xl border border-zinc-600"
          >
            <i className="fa-solid fa-magnifying-glass text-sm text-zinc-100"></i>
          </button>
        </div>
        <div className="flex flex-col items-center my-2">
          <div className="text-emerald-50 text-xl hover:text-emerald-400 hover:font-bold hover:cursor-pointer duration-200 my-3">
            <i className="fa-solid fa-cart-shopping text-sm mr-2"></i>
            <span>Cart</span>
          </div>
          <div className="text-emerald-100 text-xl hover:font-bold hover:cursor-pointer duration-200 my-3">
            <i className="fa-solid fa-user text-sm mr-2"></i>
            <span>Sign In</span>
          </div>
        </div>
      </div>
  )
}

export default Nav