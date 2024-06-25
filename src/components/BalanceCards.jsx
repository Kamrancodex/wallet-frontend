import { FaWallet } from "react-icons/fa";
import { BiErrorCircle } from "react-icons/bi";
import { VscRedo } from "react-icons/vsc";
import { Link } from "react-router-dom";

function BalanceCards({ heading, amount, icon }) {
  const renderCard = (iconComponent, colorClass) => (
    <div className="flex items-center justify-between bg-white shadow-md border border-gray-200 p-4 rounded-lg w-full lg:w-96">
      <div className="flex items-center space-x-2">
        {iconComponent}
        <div className="flex flex-col">
          <p className="text-lg font-semibold">{heading}</p>
          <div className="text-2xl font-bold">
            <span className={colorClass}>${amount}</span>
          </div>
        </div>
      </div>
      <Link to="/wallet" className="text-blue-500">
        {icon}
      </Link>
    </div>
  );

  if (heading === "Expecting Amount") {
    return renderCard(
      <VscRedo className="h-8 w-8 text-blue-800" />,
      "text-blue-600"
    );
  }

  if (heading === "Outstandings") {
    return renderCard(
      <BiErrorCircle className="h-8 w-8 text-red-800" />,
      "text-red-600"
    );
  }

  return renderCard(
    <FaWallet className="h-8 w-8 text-green-700" />,
    "text-green-600"
  );
}

export default BalanceCards;
