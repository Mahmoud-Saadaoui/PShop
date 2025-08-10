import { Link } from "react-router-dom";
import AuthWithGoogle from "../components/form/AuthWithGoogle";
import FormRedirectLink from "../components/form/FormRedirectLink";
import Logo from "../components/Logo";
import { useRegister } from "../lib/queries/auth.queries";
import Alert from "../components/Alert";
import Spinner from "../components/loaders/Spinner";
import { useState } from "react";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:[.-][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/;

  const { mutate, isPending, error, isError } = useRegister();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (email === "" || password === "" || name === "") {
      return setErrorMessage("All fields are required");
    }
    if (!nameRegex.test(name)) {
      return setErrorMessage("Please enter a valid name");
    }
    if (!emailRegex.test(email)) {
      return setErrorMessage("Please enter a valid email");
    }
    if (password.length < 6) {
      return setErrorMessage("Password can't be less than 6 characters");
    }
    mutate(
      { email, password, name },
      {
        // onSuccess: (data) => {
        //   queryClient.setQueryData(['user'], data)
        //   navigate('/')
        // },
      }
    );
    setName("");
    setEmail("");
    setPassword("");
  };
  return (
    <div className="px-4 sm:px-10 md:px-20 lg:px-40 flex justify-center py-10 min-h-screen bg-white text-[#141414]">
      {/* Display Errors If Exist */}
      {isError ? (
        <Alert
          type="error"
          message={error.response?.data.message || "Failed Register"}
        />
      ) : (
        errorMessage && <Alert type="error" message={errorMessage} /> 
      )}
      <div className="flex flex-col w-full max-w-md py-5">
        <Logo size="xl" />
        <form className="space-y-4 px-4" onSubmit={handleFormSubmit}>
          <label className="flex flex-col">
            <span className="text-sm font-medium mb-1">Username</span>
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full h-12 rounded-lg border border-gray-300 bg-neutral-50 px-4 text-sm placeholder:text-gray-400 focus:border-[#FF3956] focus:outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label className="flex flex-col">
            <span className="text-sm font-medium mb-1">Email</span>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full h-12 rounded-lg border border-gray-300 bg-neutral-50 px-4 text-sm placeholder:text-gray-400 focus:border-[#FF3956] focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="flex flex-col">
            <span className="text-sm font-medium mb-1">Password</span>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full h-12 rounded-lg border border-gray-300 bg-neutral-50 px-4 text-sm placeholder:text-gray-400 focus:border-[#FF3956] focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button
            type="submit"
            className="w-full h-12 bg-[#FF3956] text-white font-bold text-sm rounded-lg hover:bg-[#C2101E] transition"
          >
            {isPending ? <Spinner sm /> : "Register"}
          </button>
        </form>
        <AuthWithGoogle />
        <FormRedirectLink
          to="/login"
          text="Already have an account? Login here"
        />
      </div>
    </div>
  );
};

export default RegisterPage;