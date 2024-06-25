import React from "react";
import { Link } from "react-router-dom";

function AboutUs() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-[#010813] via-[#010813] to-gray-900 text-white">
      <header className="bg-[#010813] text-white py-4 px-8 flex justify-between items-center">
        <div className="text-2xl font-bold text-green-400">
          <Link to="/">pay.Me</Link>
        </div>
        <nav className="hidden md:flex space-x-6">
          <Link to="/sIGNUP" className="hover:text-green-400">
            Send Money
          </Link>

          <Link to="/SIGNUP" className="hover:text-green-400">
            Business
          </Link>
          <Link to="/faq" className="hover:text-green-400">
            FAQ
          </Link>
          <Link to="/about-us" className="hover:text-green-400">
            About Us
          </Link>
        </nav>
        <div className="flex space-x-4">
          <Link to="/signin" className="hover:text-green-400">
            Log in
          </Link>
          <Link
            to="/signup"
            className="bg-green-400 text-black px-4 py-2 rounded-full"
          >
            Register now
          </Link>
        </div>
      </header>

      <div className="flex flex-col items-center justify-center flex-grow p-8">
        <div className="max-w-4xl text-center">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-lg mb-8">
            Welcome to pay.Me, your trusted partner in seamless financial
            transactions. We are committed to providing you with the most
            secure, fast, and reliable money transfer services. Whether you are
            an individual looking to send money to loved ones or a business
            aiming to streamline your financial operations, TransWi is here to
            support you.
          </p>
          <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
          <p className="text-lg mb-8">
            Our mission is to revolutionize the way money moves across borders
            by leveraging cutting-edge technology. We aim to make financial
            transactions effortless and accessible for everyone, ensuring that
            our customers can send and receive money with confidence and ease.
          </p>
          <h2 className="text-3xl font-semibold mb-4">Our Values</h2>
          <p className="text-lg mb-8">
            At pay.Me, we value:
            <ul className="list-disc list-inside mt-2">
              <li>
                Integrity: We adhere to the highest standards of integrity in
                all our actions.
              </li>
              <li>
                Customer Focus: We prioritize our customers' needs and strive to
                exceed their expectations.
              </li>
              <li>
                Innovation: We embrace innovation to continually improve our
                services and solutions.
              </li>
              <li>
                Security: We are dedicated to ensuring the security and privacy
                of our customers' information.
              </li>
              <li>
                Collaboration: We believe in the power of collaboration to
                achieve shared goals.
              </li>
            </ul>
          </p>
          <h2 className="text-3xl font-semibold mb-4">Contact Us</h2>
          <p className="text-lg mb-8">
            We are here to help. If you have any questions or need assistance,
            please don't hesitate to contact us:
            <ul className="list-none mt-2">
              <li>Email: kam@noreply.never</li>
              <li>Phone: 1-800-123-1111</li>
              <li>Address: 123 Finance Street, Money City, 56789</li>
            </ul>
          </p>
        </div>
      </div>

      <footer className="bg-[#010813] text-white py-4">
        <div className="flex justify-center space-x-4">
          <Link to="/" className="hover:text-green-400">
            Privacy Policy
          </Link>
          <Link to="/" className="hover:text-green-400">
            Terms of Service
          </Link>
          <Link to="/" className="hover:text-green-400">
            Contact Us
          </Link>
        </div>
      </footer>
    </div>
  );
}

export default AboutUs;
