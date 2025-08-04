import {
  FaLinkedin,
  FaGithub,
  FaWhatsapp,
} from "react-icons/fa";
import { FaSquareUpwork  } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t-3 border-[#EEF0EA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center text-[#777] text-sm">
        {/* Social links */}
        <div className="flex space-x-5 mb-4 md:mb-0">
          <a
            href="https://www.linkedin.com/in/saadaoui-mahmoud"
            target="_blank"
            rel="noreferrer"
            className="hover:text-gray-900 transition"
          >
            <FaLinkedin className="text-lg" />
          </a>
          <a
            href="https://github.com/Saadaoui-Forkan"
            target="_blank"
            rel="noreferrer"
            className="hover:text-gray-900 transition"
          >
            <FaGithub className="text-lg" />
          </a>
          <a
            href="https://wa.me/21627987081"
            target="_blank"
            rel="noreferrer"
            className="hover:text-gray-900 transition"
          >
            <FaWhatsapp className="text-lg" />
          </a>
          <a
            href="https://upwork.com/freelancers/~01cc110619e81df936"
            target="_blank"
            rel="noreferrer"
            className="hover:text-gray-900 transition"
          >
            <FaSquareUpwork className="text-lg"/>
          </a>
        </div>

        {/* Text content */}
        <p className="text-center md:text-right text-gray-700">
          &copy; {new Date().getFullYear()} <strong>EShopty</strong> — Made by{" "}
          <a
            href="https://personal-portfolio-six-pearl-25.vercel.app/en"
            target="_blank"
            rel="noreferrer"
            className="font-bold text-gray-500 hover:text-gray-900 transition"
          >
            Mahmoud Saadaoui
          </a>
        </p>
      </div>
    </footer>
  );
}