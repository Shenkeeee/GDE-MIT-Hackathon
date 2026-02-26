import { GrTest } from "react-icons/gr";
import { GoQuestion } from "react-icons/go";

const Header = () => {
  return (
    <div className="header fixed top-0 h-20 bg-blue-700 w-full text-white flex items-center justify-center">
      <div className="flex w-[80%] justify-between p-2">
        <div className="gap-4 flex items-center">
          <div className="gap-2 flex items-center">
            <GrTest size={20} />
            <h1 className="text-lg">Welcome</h1>
          </div>
        </div>

        <div className="gap-2 flex items-center">
          <button className="px-2 py-2 rounded-md text-white hover:bg-blue-600 transition hover:cursor-pointer">
            About
          </button>
          <div className="flex items-center gap-2 px-3 py-2 rounded-md text-white hover:bg-blue-600 transition cursor-pointer">
            <span className="flex items-center gap-1">
              Why
              <GoQuestion size={20} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
