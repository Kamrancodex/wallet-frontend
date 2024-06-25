import { FaCheckCircle } from "react-icons/fa";

function Features() {
  return (
    <section className="py-16 bg-gray-100 w-screen">
      <div className="container mx-auto px-6 lg:px-12">
        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
          Quick And Secure Money Transfers
        </h2>
        <div className="flex flex-col lg:flex-row justify-around items-start space-y-6 lg:space-y-0">
          <div className="flex items-center space-x-2">
            <FaCheckCircle className="text-green-500 text-2xl" />
            <span className="text-xl font-semibold">
              Stripe and Paypal support
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <FaCheckCircle className="text-green-500 text-2xl" />
            <span className="text-xl font-semibold">
              Easiest way to get credit cards.
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <FaCheckCircle className="text-green-500 text-2xl" />
            <span className="text-xl font-semibold">
              Custom cards for all your needs.
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <FaCheckCircle className="text-green-500 text-2xl" />
            <span className="text-xl font-semibold">
              Superfast APIs for you to deploy.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
