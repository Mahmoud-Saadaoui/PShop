import { Link } from "react-router-dom";

const FormRedirectLink = ({ to, text }) => {
  return (
    <div className="text-center mt-4 px-4">
      <Link
        to={to}
        className="text-sm text-gray-500 underline hover:text-[#FF3956] transition"
      >
        {text}
      </Link>
    </div>
  )
}

export default FormRedirectLink