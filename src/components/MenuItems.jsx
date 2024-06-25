import { Link } from "react-router-dom";

function MenuItems({ icon, iconName, to }) {
  return (
    <Link
      to={to}
      className="flex flex-col items-center space-y-2 p-2 hover:bg-gray-200 rounded-lg lg:flex-row lg:space-y-0 lg:space-x-2"
    >
      {icon}
      <span className="hidden lg:inline text-sm lg:text-base">{iconName}</span>
    </Link>
  );
}

export default MenuItems;
