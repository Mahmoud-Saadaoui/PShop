import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  const [login, { isLoading }] = useLoginMutation();

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <div className=" mt-[50px] mx-6 md:mt-24 h-[80vh]">
      <h1 className="font-bold text-xl font-sans text-slate-700">Sign In</h1>
      <form className="w-full max-w-md mt-6" onSubmit={submitHandler}>
        <div className="mb-6 md:w-full">
          <div className="md:w-1/3">
            <label
              className=" text-gray-500 font-bold pr-4"
              htmlFor="inline-full-name"
            >
              Email
            </label>
          </div>
          <div className="md:w-full">
            <input
              className="w-full bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-slate-500"
              id="inline-full-name"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-6">
          <div className="md:w-1/3">
            <label
              className="text-gray-500 font-bold pr-4"
              htmlFor="inline-password"
            >
              Password
            </label>
          </div>
          <div className="w-full">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-slate-500"
              id="inline-password"
              type="password"
              placeholder="******************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="md:flex md:items-center">
          <div className="md:w-2/3">
            <button
              className="shadow bg-slate-700 hover:bg-slate-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="submit"
              disabled={isLoading}
            >
              Sign In
            </button>
            <p className="mt-2">
              New Customer?
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
                className="font-bold text-zinc-700 ml-2"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
        {isLoading && <Loader />}
      </form>
    </div>
  );
}

export default LoginScreen;
