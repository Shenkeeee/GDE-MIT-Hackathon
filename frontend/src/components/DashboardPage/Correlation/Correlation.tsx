import { useEffect, useState, useMemo } from "react";
import { FaUtensils, FaChartBar, FaInfoCircle } from "react-icons/fa";

interface FoodItem {
  food_name: string;
  quantity: number;
  creation_date: string;
}

interface SymptomItem {
  symptom: string;
  severity: number;
  creation_date: string;
}

interface CorrelationPoint {
  food: string;
  quantity: number;
  severity: number;
  symptom: string;
}

const DISTICT_MUTED_COLORS = [
  "#6366f1",
  "#ec4899",
  "#14b8a6",
  "#f59e0b",
  "#8b5cf6",
  "#0ea5e9",
  "#84cc16",
  "#f97316",
  "#22c55e",
  "#06b6d4",
  "#a855f7",
  "#ef4444",
  "#64748b",
];

const Correlation = () => {
  const [correlationData, setCorrelationData] = useState<CorrelationPoint[]>([]);
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [symptoms, setSymptoms] = useState<SymptomItem[]>([]);
  const [aiInsight, setAiInsight] = useState("");

  const userId = sessionStorage.getItem("userId");

  // ================= FETCH =================

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/dashboard/correlation/${userId}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setCorrelationData(data.data || []);
          setFoods(data.foods || []);
          setSymptoms(data.symptoms || []);
        }
      });

    fetch(`${import.meta.env.VITE_API_URL}/dashboard/ai_suggestion/${userId}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") setAiInsight(data.item);
      });
  }, [userId]);

  // ================= COLOR MAP =================

  const foodColorMap = useMemo(() => {
    const map: Record<string, string> = {};

    Array.from(new Set(foods.map((f) => f.food_name))).forEach(
      (food, i) => {
        map[food] =
          DISTICT_MUTED_COLORS[i % DISTICT_MUTED_COLORS.length];
      }
    );

    return map;
  }, [foods]);

  // ================= SCALING =================

  const maxQuantity = Math.max(
    ...foods.map((f) => f.quantity),
    1
  );

  const maxSeverity = Math.max(
    ...symptoms.map((s) => s.severity),
    1
  );

  // ================= SYMPTOM STATS =================

  const symptomStats = useMemo(() => {
    const map: Record<
      string,
      { total: number; severitySum: number; afterFood: number }
    > = {};

    symptoms.forEach((sym) => {
      map[sym.symptom] = {
        total: 0,
        severitySum: 0,
        afterFood: 0,
      };
    });

    correlationData.forEach((item) => {
      if (!map[item.symptom]) {
        map[item.symptom] = {
          total: 0,
          severitySum: 0,
          afterFood: 0,
        };
      }

      map[item.symptom].total += 1;
      map[item.symptom].severitySum += item.severity;
      map[item.symptom].afterFood += 1;
    });

    return Object.entries(map);
  }, [correlationData, symptoms]);

  // ================= AGGREGATED MATRIX DOTS =================

  const aggregated = useMemo(() => {
    const map: Record<string, any> = {};

    correlationData.forEach((item) => {
      const key = `${item.food}-${item.symptom}`;

      if (!map[key]) {
        map[key] = { ...item, frequency: 0 };
      }

      map[key].frequency += 1;
    });

    return Object.values(map);
  }, [correlationData]);

  // ================= UNIQUE LISTS =================

  const uniqueFoods = Array.from(
    new Set(correlationData.map(d => d.food))
  );

  const uniqueSymptoms = Array.from(
    new Set(correlationData.map(d => d.symptom))
  );

  // ================= RENDER =================

  return (
    <div className="flex flex-col gap-10">

      <div
        className="grid gap-10"
        style={{ gridTemplateColumns: "1fr 1fr 2fr" }}
      >

        {/* ================= MATRIX SCATTER ================= */}
        <div className="bg-white/70 backdrop-blur-md rounded-3xl p-8 shadow-md">

          <div className="flex items-center gap-2 mb-6">
            <FaChartBar className="text-indigo-600" />
            <h3 className="font-semibold text-[#0f3d2e]">
              Correlation Matrix
            </h3>
          </div>

          <div className="relative h-72 border rounded-xl bg-white">

            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gray-200" />
            <div className="absolute left-1/2 top-0 h-full w-[1px] bg-gray-200" />

            {aggregated.map((point: any, index) => {

              const x = (point.quantity / maxQuantity) * 100;
              const y = (point.severity / maxSeverity) * 100;

              const size = 8 + point.frequency * 5;

              return (
                <div
                  key={index}
                  className="absolute rounded-full transition hover:scale-125"
                  style={{
                    left: `${x}%`,
                    bottom: `${y}%`,
                    width: size,
                    height: size,
                    backgroundColor: foodColorMap[point.food],
                    opacity: 0.85,
                    transform: "translate(-50%, 50%)",
                  }}
                  title={`${point.food}
${point.symptom}
Qty: ${point.quantity}
Severity: ${point.severity}
Frequency: ${point.frequency}`}
                />
              );
            })}

          </div>

          {/* LEGEND */}
          <div className="mt-4 text-xs">
            <h4 className="font-semibold mb-2">Food Colors</h4>

            <div className="grid grid-cols-2 gap-2">
              {uniqueFoods.map(food => (
                <div key={food} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: foodColorMap[food] }}
                  />
                  {food}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ================= SYMPTOM FREQUENCY ================= */}
        <div className="bg-white/70 backdrop-blur-md rounded-3xl p-8 shadow-md">

          <h3 className="font-semibold text-[#0f3d2e] mb-6">
            Symptom Frequency
          </h3>

          <div className="flex items-end gap-4 h-72">

            {symptomStats.map(([symptom, stats]: any, index) => {

              const freq = stats.total;

              const severityAvg =
                freq > 0 ? stats.severitySum / freq : 0;

              const color = stats.afterFood
                ? `rgba(220,38,38,${0.3 + severityAvg / 10})`
                : "rgba(180,180,180,0.4)";

              const height = Math.max(freq * 22, 12);

              return (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className="w-10 rounded-xl transition hover:scale-110"
                    style={{
                      height: `${height}px`,
                      backgroundColor: color,
                    }}
                  />

                  <span className="text-xs mt-2 text-center">
                    {symptom}
                    <br />
                    <span className="text-gray-400">
                      ({freq})
                    </span>
                  </span>
                </div>
              );
            })}
          </div>

        </div>

        {/* ================= AI INSIGHT ================= */}
        <div className="bg-gradient-to-br from-lime-300 to-green-400 rounded-3xl p-10 shadow-lg text-[#083d2a]">

          <div className="flex items-center gap-3 mb-6">
            <FaUtensils className="text-2xl" />
            <h3 className="text-xl font-semibold">AI Insight</h3>
          </div>

          <p className="text-sm whitespace-pre-wrap">
            {aiInsight || "Analyzing patterns..."}
          </p>

        </div>

      </div>

      {/* ================= TRUE CORRELATION MATRIX TABLE ================= */}

      <div className="bg-white/70 backdrop-blur-md rounded-3xl p-8 shadow-md">

        <div className="flex items-center gap-2 mb-6">
          <FaInfoCircle className="text-indigo-600" />
          <h3 className="font-semibold">
            Food → Symptom Frequency Matrix
          </h3>
        </div>

        <div className="overflow-auto max-h-[400px]">

          <table className="w-full text-xs border-collapse">

            <thead>
              <tr>
                <th className="p-2 bg-gray-100 sticky left-0">
                  Food / Symptom
                </th>

                {uniqueSymptoms.map(sym => (
                  <th key={sym} className="p-2 bg-gray-50">
                    {sym}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {uniqueFoods.map(food => (
                <tr key={food}>

                  <td className="p-2 font-medium bg-gray-50 sticky left-0">
                    <span
                      className="inline-block w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: foodColorMap[food] }}
                    />
                    {food}
                  </td>

                  {uniqueSymptoms.map(sym => {

                    const count = correlationData.filter(
                      d => d.food === food && d.symptom === sym
                    ).length;

                    return (
                      <td
                        key={sym}
                        className="p-2 text-center"
                        style={{
                          backgroundColor: count > 0
                            ? `rgba(220,38,38,${0.2 + Math.min(count / 5, 1)})`
                            : "transparent"
                        }}
                      >
                        {count || ""}
                      </td>
                    );

                  })}

                </tr>
              ))}
            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default Correlation;