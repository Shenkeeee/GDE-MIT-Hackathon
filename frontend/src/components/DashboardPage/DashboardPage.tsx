import { useEffect, useState } from "react";

import Correlation from "./Correlation/Correlation";
import TableFood from "./FoodTable/FoodTable";
import TopBar from "./TopBar/TopBar";

import { FaFilter } from "react-icons/fa";
import TableSymptoms from "./SymptomsTable/SymptomsTable";

const DashboardPage = () => {
  type Tab = "correlation" | "table food" | "table symptoms";

  const tabMap = {
    Correlation: "correlation",
    "My Food Log": "table food",
    "My Symptom Log": "table symptoms",
  } as const;

  const [activeTab, setActiveTab] = useState<Tab>("correlation");
  const [userName, setUserName] = useState("Joe");
  const [aiInsight, setAiInsight] = useState<string | null>(null);

  const handleDashboardRequest = () => {
    fetch(
      `${import.meta.env.VITE_API_URL}/dashboard/${sessionStorage.getItem("userId")}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: sessionStorage.getItem("userId") }),
      },
    )
      .then((res) => res.json())
      .then((data: { status: "success"; name: string }) => {
        // console.log("result is ", data);
        setUserName(data.name);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    handleDashboardRequest();
  }, []);

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

      <TopBar userName={userName} />

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

        {activeTab === "correlation" && (
          <Correlation />
        )}
        {activeTab === "table food" && <TableFood />}
        {activeTab === "table symptoms" && <TableSymptoms />}
      </div>
    </div>
  );
};

export default DashboardPage;
