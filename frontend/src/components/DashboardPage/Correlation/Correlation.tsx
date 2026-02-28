import { useEffect, useState } from "react";

import { FaUtensils } from "react-icons/fa";

const Correlation = () => {

  const [aiInsight, setAiInsight] = useState("");

  const handleCorrelationRequest = () => {
    fetch(
      `${import.meta.env.VITE_API_URL}/dashboard/ai_suggestion/${sessionStorage.getItem("userId")}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: sessionStorage.getItem("userId") }),
      },
    )
      .then((res) => res.json())
      .then((data: {status: "success", item: string}) => {
        console.log("result is ", data);
        setAiInsight(data.item)
      })
      .catch((err) => console.error(err));
  };

  // get it as soon as u see this component, once
  useEffect(() => {
    handleCorrelationRequest();
  }, []);

  return (
    <div className="flex-1 flex flex-col justify-between">
      {/* TOP GRID 1 1 2 */}
      <div
        className="grid gap-10 mb-10"
        style={{ gridTemplateColumns: "1fr 1fr 2fr" }}
      >
        {/* Correlation */}
        <div className="bg-white/70 backdrop-blur-md rounded-3xl p-8 shadow-md">
          <h3 className="text-[#0f3d2e] font-semibold mb-6">
            Correlation Analysis
          </h3>

          <div className="relative h-60">
            <div className="absolute inset-0 flex items-center justify-center text-sm text-green-700">
              Scatter Plot
            </div>
            <div className="absolute bottom-6 left-6 w-3 h-3 bg-green-700 rounded-full"></div>
            <div className="absolute bottom-16 left-20 w-3 h-3 bg-green-500 rounded-full"></div>
            <div className="absolute bottom-24 left-36 w-3 h-3 bg-green-600 rounded-full"></div>
            <div className="absolute bottom-10 left-48 w-3 h-3 bg-green-400 rounded-full"></div>
          </div>
        </div>

        {/* Histogram */}
        <div className="bg-white/70 backdrop-blur-md rounded-3xl p-8 shadow-md">
          <h3 className="text-[#0f3d2e] font-semibold mb-6">
            Symptom Frequency
          </h3>

          <div className="flex items-end gap-5 h-60">
            <div className="w-10 bg-green-400 rounded-xl h-24"></div>
            <div className="w-10 bg-green-600 rounded-xl h-36"></div>
            <div className="w-10 bg-green-500 rounded-xl h-20"></div>
            <div className="w-10 bg-green-700 rounded-xl h-44"></div>
          </div>
        </div>

        {/* AI Insight */}
        <div className="bg-linear-to-br from-lime-300 to-green-400 rounded-3xl p-10 shadow-lg flex flex-col justify-center text-[#083d2a]">
          <div className="flex items-center gap-3 mb-6">
            <FaUtensils className="text-2xl" />
            <h3 className="text-xl font-semibold">AI Insight</h3>
          </div>

          <p className="leading-relaxed text-sm">
            {aiInsight}
          </p>
        </div>
      </div>

      {/* BOTTOM GRID */}
      <div className="grid grid-cols-3 gap-10">
        {/* Monthly */}
        <div className="bg-white/70 backdrop-blur-md rounded-3xl p-8 shadow-md">
          <h3 className="text-[#0f3d2e] font-semibold mb-6">
            Monthly Overview
          </h3>

          <div className="grid grid-cols-7 gap-2 text-xs text-center">
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg ${
                  i % 6 === 0 ? "bg-green-600 text-white" : "bg-green-200"
                }`}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>

        {/* Food Log */}
        <div className="bg-white/70 backdrop-blur-md rounded-3xl p-8 shadow-md">
          <h3 className="text-[#0f3d2e] font-semibold mb-6">Food Log</h3>

          <div className="space-y-4 text-sm">
            <div className="flex justify-between">
              <span>Breakfast</span>
              <span className="font-medium text-green-700">350 kcal</span>
            </div>
            <div className="flex justify-between">
              <span>Lunch</span>
              <span className="font-medium text-green-700">600 kcal</span>
            </div>
            <div className="flex justify-between">
              <span>Dinner</span>
              <span className="font-medium text-green-700">720 kcal</span>
            </div>
          </div>
        </div>

        {/* Symptom Diary */}
        <div className="bg-white/70 backdrop-blur-md rounded-3xl p-8 shadow-md">
          <h3 className="text-[#0f3d2e] font-semibold mb-6">Symptom Diary</h3>

          <div className="space-y-4 text-sm">
            <div className="flex justify-between">
              <span>Bloating</span>
              <span className="text-yellow-600 font-medium">Medium</span>
            </div>
            <div className="flex justify-between">
              <span>Headache</span>
              <span className="text-green-700 font-medium">Low</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Correlation;
