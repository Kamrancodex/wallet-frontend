import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-[#010813] text-white py-4 px-6 md:px-8 flex justify-between items-center w-full">
      <div className="text-2xl font-bold text-green-400">
        <Link to="/">Pay.mE</Link>
      </div>
      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-white focus:outline-none">
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>
      <nav
        className={`${
          isOpen ? "transform translate-x-0" : "transform -translate-x-full"
        } md:flex md:items-center md:space-x-6 absolute md:static top-16 left-0 w-full md:w-auto bg-[#010813] md:bg-transparent z-10 transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col md:flex-row md:items-center w-full md:w-auto">
          <Link
            to="/signup"
            className="block md:inline-block py-2 px-4 hover:text-green-400"
          >
            Send Money
          </Link>

          <Link
            to="/signup"
            className="block md:inline-block py-2 px-4 hover:text-green-400"
          >
            Business
          </Link>
          <Link
            to="/faq"
            className="block md:inline-block py-2 px-4 hover:text-green-400"
          >
            FAQ
          </Link>
          <Link
            to="/about-us"
            className="block md:inline-block py-2 px-4 hover:text-green-400"
          >
            About Us
          </Link>
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mt-4 md:mt-0 w-full md:w-auto">
          <Link
            to="/signin"
            className="block md:inline-block py-2 px-4 hover:text-green-400"
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className="block md:inline-block bg-green-400 text-black px-4 py-2 rounded-full mt-2 md:mt-0"
          >
            Register now
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
