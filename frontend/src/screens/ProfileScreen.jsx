import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useProfileMutation } from "../slices/usersApiSlice";
import Loader from "../components/Loader";
import { toast } from 'react-toastify';
import { setCredentials } from "../slices/authSlice";

function ProfileScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.name]);

  const updateProfileHandler = async (e) => {
    e.preventDefault();
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile updated successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="mt-[50px] mx-6 md:mt-24 mb-2">
      <h1 className="text-slate-700 font-bold text-lg">User Profile</h1>
      <div className="column1">
        <form className="w-full max-w-md mt-6" onSubmit={updateProfileHandler}>
          <div className="mb-6 md:w-full">
            <div className="md:w-1/3">
              <label
                className=" text-gray-500 font-bold pr-4"
                htmlFor="inline-name"
              >
                Name
              </label>
            </div>
            <div className="md:w-full">
              <input
                className="w-full bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-slate-500"
                id="inline-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-6 md:w-full">
            <div className="md:w-1/3">
              <label
                className=" text-gray-500 font-bold pr-4"
                htmlFor="inline-email"
              >
                Email
              </label>
            </div>
            <div className="md:w-full">
              <input
                className="w-full bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-slate-500"
                id="inline-email"
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
          <div className="mb-6">
            <div className="md:w-1/3">
              <label
                className="text-gray-500 font-bold pr-4"
                htmlFor="inline-confirm-password"
              >
                Confirm Password
              </label>
            </div>
            <div className="w-full">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-slate-500"
                id="inline-confirm-password"
                type="password"
                placeholder="******************"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="">
            <button
              className="shadow bg-slate-700 hover:bg-slate-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Update Profile
            </button>
            {loadingUpdateProfile && <Loader/>}
          </div>
        </form>
      </div>
      <div className="column2"></div>
    </div>
  );
}

export default ProfileScreen;
