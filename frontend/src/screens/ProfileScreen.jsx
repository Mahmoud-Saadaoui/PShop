import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useProfileMutation } from "../slices/usersApiSlice";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { setCredentials } from "../slices/authSlice";
import { useGetMyOrdersQuery } from "../slices/ordersApiSlice";
import { Link } from "react-router-dom";

function ProfileScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  const {
    data: myOrders,
    isLoading: myOrdersLoading,
    error: myOrdersError,
  } = useGetMyOrdersQuery();

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
    <div className="mt-[50px] mx-6 lg:mt-24 mb-2">
      <div className="">
        <h2 className="text-slate-700 font-bold text-lg">
          Update User Information
        </h2>
        <form className="w-full max-w-md mt-2" onSubmit={updateProfileHandler}>
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
            <div className="md:w-2/3">
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
            {loadingUpdateProfile && <Loader />}
          </div>
        </form>
      </div>
      <div className="mt-6">
        <h2 className="text-slate-700 font-bold text-lg">My Orders</h2>
        {myOrdersLoading ? (
          <Loader />
        ) : myOrdersError ? (
          <message variant={"text-red-700 bg-red-200"}>
            {myOrdersError?.data?.message || myOrdersError.error}
          </message>
        ) : (
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                        >
                          ID
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                        >
                          DATE
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                        >
                          TOTAL
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                        >
                          PAID
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                        >
                          DELIVERED
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                        ></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {myOrders.map((order) => (
                        <tr key={order._id}>
                          <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                            {order._id}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                            {order.createdAt.substring(0, 10)}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                            {order.totalPrice}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                            {order.isPaid ? (
                              order.paidAt.substring(0, 10)
                            ) : (
                              <i className="fa-solid fa-xmark text-red-500"></i>
                            )}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                            {order.isDelivered ? (
                              order.deliveredAt.substring(0, 10)
                            ) : (
                              <i className="fa-solid fa-xmark text-red-500"></i>
                            )}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                            <Link to={`/order/${order._id}`}>
                              <button className="font-bold text-blue-900">Details</button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileScreen;
