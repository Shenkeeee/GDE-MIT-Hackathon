import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AddFoodModal from "./AddFoodModal/AddFoodModal";
import AddSymptomModal from "./AddSympthomModal/AddSympthomModal";

import { IoMdExit } from "react-icons/io";

const TopBar = ({ userName }) => {
  const navigate = useNavigate();
  const [showAddFood, setShowAddFood] = useState(false);
  const [showAddSympthoms, setShowAddSympthoms] = useState(false);

  const logout = () => {
    sessionStorage.removeItem("userId");
    navigate("/");
  };

  return (
    <div className="relative z-50 flex justify-between items-center px-16 pt-10 text-white">
      {showAddFood && (
        <AddFoodModal
          open={showAddFood}
          onClose={() => setShowAddFood(false)}
          userId={sessionStorage.getItem("userId")}
        />
      )}
      {showAddSympthoms && (
        <AddSymptomModal
          open={showAddSympthoms}
          onClose={() => setShowAddSympthoms(false)}
          userId={sessionStorage.getItem("userId")}
        />
      )}

      <div className="flex gap-4">
        <button
          className="px-5 py-2 rounded-full bg-green-600 hover:bg-green-700 transition"
          onClick={() => setShowAddFood(true)}
        >
          Add Food
        </button>
        <button
          className="px-5 py-2 rounded-full bg-red-500 hover:bg-red-600 transition"
          onClick={() => setShowAddSympthoms(true)}
        >
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
