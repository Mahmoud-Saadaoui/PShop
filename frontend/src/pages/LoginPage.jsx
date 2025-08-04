import logo from "../assets/EShopty.png"

const LoginPage = () => {
  return (
    <div className="px-4 sm:px-10 md:px-20 lg:px-40 flex justify-center py-10 bg-white text-[#141414]">
      <div className="layout-content-container flex flex-col w-full max-w-[512px] py-5 flex-1">
        <image alt="logo" src={logo}/>

        <form>
        {/* Email */}
        <div className="flex flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-base font-medium pb-2">Email</p>
            <input
              type="email"
              placeholder="Enter your email"
              className="form-input w-full resize-none rounded-xl text-[#141414] focus:outline-0 focus:ring-0 border border-[#dbdbdb] bg-neutral-50 focus:border-[#dbdbdb] h-14 placeholder:text-neutral-500 p-[15px] text-base font-normal"
            />
          </label>
        </div>

        {/* Password */}
        <div className="flex flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-base font-medium pb-2">Password</p>
            <input
              type="password"
              placeholder="Enter your password"
              className="form-input w-full resize-none rounded-xl text-[#141414] focus:outline-0 focus:ring-0 border border-[#dbdbdb] bg-neutral-50 focus:border-[#dbdbdb] h-14 placeholder:text-neutral-500 p-[15px] text-base font-normal"
            />
          </label>
        </div>

        {/* Forgot password */}
        <p className="text-neutral-500 text-sm text-right px-4 underline cursor-pointer pb-3 pt-1">
          Forgot your password?
        </p>

        {/* Sign in button */}
        <div className="flex px-4 py-3">
          <button
            className="w-full h-10 bg-black text-neutral-50 font-bold text-sm rounded-xl"
          >
            Sign In
          </button>
        </div>
        </form>

        {/* Sign in with Google */}
        <div className="flex px-4 py-3">
          <button
            className="w-full h-10 bg-[#ededed] text-[#141414] font-bold text-sm rounded-xl flex items-center justify-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20px"
              height="20px"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M224,128a96,96,0,1,1-21.95-61.09,8,8,0,1,1-12.33,10.18A80,80,0,1,0,207.6,136H128a8,8,0,0,1,0-16h88A8,8,0,0,1,224,128Z" />
            </svg>
            <span>Sign in with Google</span>
          </button>
        </div>

        {/* Register link */}
        <p className="text-neutral-500 text-sm text-center px-4 underline cursor-pointer pt-1">
          Don't have an account? Register now
        </p>
      </div>
    </div>
  );
};

export default LoginPage;