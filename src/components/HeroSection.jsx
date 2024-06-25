import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <section className="bg-[#010813] text-white py-20 w-screen">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between px-6 lg:px-12">
        <div className="lg:w-1/2 mb-10 lg:mb-0">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Send Money Globally Instantly And With Ironclad Security
          </h1>
          <p className="text-lg mb-6">
            With our seamless and user-friendly interface, you can now send
            money anywhere in the world.
          </p>
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
            <Link
              to="/signup"
              className="bg-green-400 text-black px-6 py-3 rounded-full font-semibold text-center"
            >
              Get Started
            </Link>
            <Link
              to="/discover-transaction"
              className="flex items-center justify-center text-green-400"
            >
              <span className="mr-2">Discover Transaction</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 4v16m8-8H4" />
              </svg>
            </Link>
          </div>
        </div>
        <div className="lg:w-1/2 flex justify-center mt-10 lg:mt-0">
          <div className="bg-white text-black p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Transfer Money With pay.Me
            </h2>
            <form>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="amount"
                >
                  You Send
                </label>
                <div className="flex items-center">
                  <input
                    type="text"
                    id="amount"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    defaultValue="$2,500"
                  />
                  <select
                    id="currency"
                    className="ml-2 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option>USD</option>
                    <option>EUR</option>
                  </select>
                </div>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="fee"
                >
                  Transfer Rate
                </label>
                <input
                  type="text"
                  id="fee"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  defaultValue="2.50 USD"
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="recipient"
                >
                  Recipient Gets
                </label>
                <div className="flex items-center">
                  <input
                    type="text"
                    id="recipient"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    defaultValue="€2330.88"
                  />
                  <select
                    id="recipient-currency"
                    className="ml-2 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option>EUR</option>
                    <option>USD</option>
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="bg-green-400 text-black font-bold py-2 px-4 rounded-full w-full"
              >
                CONTINUE
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
