import { useEffect, useState } from "react";
import { FaUtensils } from "react-icons/fa";

interface CorrelationPoint {
  food: string;
  quantity: number;
  severity: number;
  symptom: string;
}

const Correlation = () => {
  const [correlationData, setCorrelationData] = useState<CorrelationPoint[]>([]);
  const [aiInsight, setAiInsight] = useState("");

  const userId = sessionStorage.getItem("userId");

  const handleCorrelationRequest = () => {
    fetch(
      `${import.meta.env.VITE_API_URL}/dashboard/correlation/${userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: sessionStorage.getItem("userId") }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setCorrelationData(data.data || []);
        }
      })
      .catch((err) => console.error(err));
  };

  const handleAiInsight = () => {
    fetch(
      `${import.meta.env.VITE_API_URL}/dashboard/ai_suggestion/${userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setAiInsight(data.item);
        }
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    handleCorrelationRequest();
    handleAiInsight();
  }, []);

  // Auto-scale Y axis based on max quantity
  const maxQuantity =
    correlationData.length > 0
      ? Math.max(...correlationData.map((d) => d.quantity))
      : 1;

  return (
    <div className="flex-1 flex flex-col justify-between">
      <div
        className="grid gap-10 mb-10"
        style={{ gridTemplateColumns: "1fr 1fr 2fr" }}
      >
        {/* Scatter Plot */}
        <div className="bg-white/70 backdrop-blur-md rounded-3xl p-8 shadow-md">
          <h3 className="text-[#0f3d2e] font-semibold mb-6">
            Correlation Analysis
          </h3>

          <div className="relative h-60 border rounded-xl bg-white">
            {/* Axes labels */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-xs text-gray-600">
              Symptom Severity →
            </div>
            <div className="absolute top-1/2 left-0 transform -rotate-90 -translate-y-1/2 text-xs text-gray-600">
              Quantity Consumed →
            </div>

            {correlationData.map((point, index) => {
              const x = (point.severity / 10) * 100; // assuming severity 0-10
              const y = (point.quantity / maxQuantity) * 100;

              return (
                <div
                  key={index}
                  title={`${point.food} → ${point.symptom} (Severity: ${point.severity}, Qty: ${point.quantity})`}
                  className="absolute w-3 h-3 bg-green-600 rounded-full hover:scale-125 transition-transform"
                  style={{
                    left: `${x}%`,
                    bottom: `${y}%`,
                    transform: "translate(-50%, 50%)",
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Symptom Frequency Histogram */}
        <div className="bg-white/70 backdrop-blur-md rounded-3xl p-8 shadow-md">
          <h3 className="text-[#0f3d2e] font-semibold mb-6">
            Symptom Frequency
          </h3>

          <div className="flex items-end gap-5 h-60">
            {Object.entries(
              correlationData.reduce((acc, curr) => {
                acc[curr.symptom] = (acc[curr.symptom] || 0) + 1;
                return acc;
              }, {})
            ).map(([symptom, count], index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className="w-10 bg-green-600 rounded-xl"
                  style={{ height: `${+count * 20}px` }}
                ></div>
                <span className="text-xs mt-2">{symptom}</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insight */}
        <div className="bg-gradient-to-br from-lime-300 to-green-400 rounded-3xl p-10 shadow-lg flex flex-col justify-center text-[#083d2a]">
          <div className="flex items-center gap-3 mb-6">
            <FaUtensils className="text-2xl" />
            <h3 className="text-xl font-semibold">AI Insight</h3>
          </div>

          <p className="leading-relaxed text-sm whitespace-pre-wrap">
            {aiInsight || "Analyzing food and symptom patterns..."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Correlation;