import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useVerifyEmail } from "../lib/queries/auth.queries";
import { AiOutlineCheckCircle, AiOutlineWarning } from "react-icons/ai";
import Spinner from "../components/loaders/Spinner";

const VerifyEmail = () => {
  const { userId, token } = useParams();
  const { mutate, data, isSuccess, isError, error, isPending } = useVerifyEmail(userId, token);

  useEffect(() => {
    if (userId && token) {
      mutate({ userId, token });
    }
  }, [userId, token, mutate]);

  if (!token || !userId) return null

  if (isPending) {
    return <Spinner />;
  }
  return (
    <section className="flex items-center justify-center min-h-[calc(100vh-2rem)] px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md p-6 text-center transition-all duration-300">
        {isSuccess && (
          <>
            <AiOutlineCheckCircle className="text-teal-600 dark:text-teal-400 text-6xl mx-auto animate-bounce mb-4" />
            <h1 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-white mb-2">
              {data.message || "Your Account is Verified!"}
            </h1>
            <Link
              to="/login"
              className="inline-block bg-teal-600 hover:bg-teal-700 text-white font-medium mt-6 py-2 px-6 rounded-full transition-colors duration-300"
            >
              Login
            </Link>
          </>
        )}
        {isError && (
          <>
            <AiOutlineWarning className="text-red-500 dark:text-red-400 text-6xl mx-auto animate-pulse mb-4" />
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
              {error}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
              Please check your verification link or request a new one.
            </p>
          </>
        )}
      </div>
    </section>
  );
};

export default VerifyEmail;
