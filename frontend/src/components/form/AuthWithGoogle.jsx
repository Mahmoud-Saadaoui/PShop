import React from "react";

const AuthWithGoogle = () => {
  return (
    <>
      <div className="flex items-center my-4 px-4">
        <div className="flex-grow h-px bg-gray-200"></div>
        <span className="px-2 text-sm text-gray-400">OR</span>
        <div className="flex-grow h-px bg-gray-200"></div>
      </div>

      <div className="px-4">
        <button className="w-full h-12 bg-[#f5f5f5] text-[#141414] font-medium text-sm rounded-lg flex items-center justify-center gap-2 hover:bg-[#FFCDD2] transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 256 256"
          >
            <path d="M224,128a96,96,0,1,1-21.95-61.09,8,8,0,1,1-12.33,10.18A80,80,0,1,0,207.6,136H128a8,8,0,0,1,0-16h88A8,8,0,0,1,224,128Z" />
          </svg>
          <span>Register with Google</span>
        </button>
      </div>
    </>
  );
};

export default AuthWithGoogle;