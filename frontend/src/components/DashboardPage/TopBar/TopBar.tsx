import { IoMdExit } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const TopBar = ({ userName }) => {
  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.removeItem("userId");
    navigate("/");
  };

  return (
    <div className="relative z-10 flex justify-between items-center px-16 pt-10 text-white">
      <div className="flex gap-4">
        <button className="px-5 py-2 rounded-full bg-green-600 hover:bg-green-700 transition">
          Add Food
        </button>
        <button className="px-5 py-2 rounded-full bg-red-500 hover:bg-red-600 transition">
          Add Symptom
        </button>
      </div>

      <div className="flex gap-2 items-center justify-center">
        <h2 className="text-3xl font-semibold text-lime-300">
          Hi, {userName}!
        </h2>
        <button className="hover:cursor-pointer" onClick={logout}>
          <IoMdExit size={24} />
        </button>
      </div>
    </div>
  );
};

export default TopBar;
