import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from "../slices/usersApiSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import Message from "../components/Message";

function UserEditScreen() {
  const { id: userId } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useGetUserDetailsQuery(userId);

  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateUser({ userId, name, email });
      toast.success("user updated successfully");
      refetch();
      navigate("/admin/userlist");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);
  return (
    <div className="mt-[50px] mx-6 lg:mt-24 mb-2">
      <div className="mt-4 w-[100px] bg-gray-300 p-2 text-center rounded-md hover:bg-gray-600 hover:text-gray-50 duration-200">
        <Link to='/admin/userlist'>Go Back</Link>
      </div>
      <h1 className="mt-2 text-slate-700 font-bold text-lg">Edit Product</h1>
      {loadingUpdate && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant={"text-red-700 bg-red-200"}>{error}</Message>
      ) : (
        <form className="w-full max-w-md mt-6" onSubmit={submitHandler}>
          <div className="mb-6 md:w-full">
            <div className="md:w-2/3">
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
                placeholder="Enter a name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-6 md:w-full">
            <div className="md:w-2/3">
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
                placeholder="Enter a name"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <button
            className="shadow bg-slate-700 hover:bg-slate-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 mb-4 rounded"
            type="submit"
          >
            Update
          </button>
        </form>
      )}
    </div>
  );
}

export default UserEditScreen;
