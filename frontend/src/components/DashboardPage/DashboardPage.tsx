import { useState } from "react";

import Correlation from "./Correlation/Correlation";
import TableFood from "./FoodTable/FoodTable";

import { FaFilter } from "react-icons/fa";

const DashboardPage = () => {
  type Tab =
    | "correlation"
    | "food"
    | "symptoms"
    | "table food"
    | "table symptoms";

  const tabMap = {
    Correlation: "correlation",
    Food: "food",
    Symptoms: "symptoms",
    "Table Food": "table food",
    "Table Symptoms": "table symptoms",
  } as const;

  const [activeTab, setActiveTab] = useState<Tab>("correlation");

  return (
    <div className="min-h-screen w-screen bg-[#0f3d2e] relative">
      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1501004318641-b39e6451bec6')",
        }}
      />

      {/* TOP BAR */}
      <div className="relative z-10 flex justify-between items-center px-16 pt-10 text-white">
        <div className="flex gap-4">
          <button className="px-5 py-2 rounded-full bg-green-600 hover:bg-green-700 transition">
            Add Food
          </button>
          <button className="px-5 py-2 rounded-full bg-red-500 hover:bg-red-600 transition">
            Add Symptom
          </button>
        </div>

        <h2 className="text-3xl font-semibold text-lime-300">Hi, Mate</h2>
      </div>

      {/* MAIN PANEL */}
      <div className="relative z-10 mt-12 mx-16 bg-[#f1f3e8] rounded-t-3xl p-12 shadow-xl min-h-[78vh] flex flex-col">
        {/* TABS + FILTER ROW */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex bg-[#e8ecd9] rounded-2xl text-sm">
            {Object.entries(tabMap).map(([label, value]) => (
              <div
                key={value}
                className={`px-6 py-3 rounded-2xl transition ${
                  activeTab === value
                    ? "bg-[#f1f3e8] font-semibold text-[#0f3d2e]"
                    : "text-[#0f3d2e] opacity-60 hover:opacity-100 cursor-pointer"
                }`}
                onClick={() => setActiveTab(value)}
              >
                {label}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 text-[#0f3d2e] cursor-pointer">
            <span className="text-sm font-medium">Filtering</span>
            <FaFilter className="text-lg" />
          </div>
        </div>

        {activeTab === "correlation" && <Correlation />}
        {activeTab === "table food" && <TableFood />}
      </div>
    </div>
  );
};

export default DashboardPage;
