// components/Logo.jsx
import { Link } from "react-router-dom";

const Logo = ({ size }) => {
  const sizeClasses = {
    md: {
      title: "text-md",
      slogan: "text-[10px]",
    },
    xl: {
      title: "text-2xl",
      slogan: "text-md",
    },
  };

  const selectedSize = sizeClasses[size] || sizeClasses["md"];

  return (
    <Link
      to="/"
      className="flex flex-col items-center font-logo leading-tight mb-6"
    >
      <h1 className={`font-extrabold tracking-wide text-[#FF3956] ${selectedSize.title}`}>
        EShopty
      </h1>
      <p
        className={`uppercase tracking-widest font-semibold text-gray-500 ${selectedSize.slogan}`}
      >
        Shop Smart. Live Better
      </p>
    </Link>
  );
};

export default Logo;