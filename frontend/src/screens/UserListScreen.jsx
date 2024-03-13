import React from "react";
import { useDeleteUserMutation, useGetUsersQuery } from "../slices/usersApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify'

function UserListScreen() {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
 
  const [deleteUser, {isLoading: loadingDelete}] = useDeleteUserMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure')) {
      try {
        await deleteUser(id);
        refetch();
        toast.success('user deleted')
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  return (
    <div className="mt-[50px] mx-6 lg:mt-24 mb-2">
      <h1 className="text-slate-700 font-bold text-lg">Users</h1>
      {loadingDelete && <Loader/>}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant={"text-red-700 bg-red-200"}>
          {error?.data?.message || error.error}
        </Message>
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
                        NAME
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      >
                        EMAIL
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      >
                        ADMIN
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      ></th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{user.name}</td>
                        <td>
                          <Link href={`mailto:${user.email}`}>
                            {user.email}
                          </Link>
                        </td>
                        <td>
                          {user.isAdmin ? (
                            <i className="fa-solid fa-check text-green-600"></i>
                          ) : (
                            <i className="fa-solid fa-xmark text-red-500"></i>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                          {!user.isAdmin && (
                            <>
                              <Link to={`/admin/user/${user._id}/edit`}>
                                <button className="font-bold text-blue-900">
                                  <i className="fa-solid fa-pen-to-square text-blue-800"></i>
                                </button>
                              </Link>
                              <button
                                className="ml-4"
                                onClick={() => deleteHandler(user._id)}
                              >
                                <i className="fa-solid fa-trash text-red-700"></i>
                              </button>
                            </>
                          )}
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
  );
}

export default UserListScreen;
