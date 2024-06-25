import React from "react";
import { Link } from "react-router-dom";

function FAQ() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-[#010813] via-[#010813] to-gray-900 text-white">
      <header className="bg-[#010813] text-white py-4 px-8 flex justify-between items-center">
        <div className="text-2xl font-bold text-green-400">
          <Link to="/">pay.Me</Link>
        </div>
        <nav className="hidden md:flex space-x-6">
          <Link to="/signup" className="hover:text-green-400">
            Send Money
          </Link>

          <Link to="/business" className="hover:text-green-400">
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
          <h1 className="text-4xl font-bold mb-8">
            Frequently Asked Questions
          </h1>
          <div className="text-left space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2">What is TransWi?</h2>
              <p className="text-lg">
                pay.Me is a digital wallet service that allows you to send and
                receive money securely and efficiently. Whether you are an
                individual or a business, our platform is designed to make
                financial transactions simple and convenient.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2">
                How do I create an account?
              </h2>
              <p className="text-lg">
                Creating an account with pay.Me is easy. Simply click on the
                "Register now" button on the top right corner of the page and
                fill out the registration form. You'll need to provide some
                basic information and verify your email address.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2">Is pay.Me secure?</h2>
              <p className="text-lg">
                Yes, security is our top priority. We use advanced encryption
                and security protocols to protect your data and transactions.
                Your personal information and financial data are always kept
                safe with us.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2">
                Can I use pay.Me for business transactions?
              </h2>
              <p className="text-lg">
                Absolutely! pay.Me offers solutions tailored for businesses. You
                can manage your business finances, send and receive payments,
                and access detailed transaction reports all from one place.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2">
                What should I do if I forget my password?
              </h2>
              <p className="text-lg">
                If you forget your password, click on the "Forgot password?"
                link on the sign-in page. Follow the instructions to reset your
                password via email. If you have any issues, our support team is
                here to help.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-2">
                How can I contact customer support?
              </h2>
              <p className="text-lg">
                You can contact our customer support team by emailing
                kam@noreply.never or calling 1-800-123-1111. We are here to
                assist you with any questions or issues you may have.
              </p>
            </div>
          </div>
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

export default FAQ;
