import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

type Symptom = {
  id: number;
  user_id: number;
  severity: number;
  symptom: string;
  creation_date: string;
};

const severityColor = (severity: number) => {
  switch (severity) {
    case 1:
      return "bg-green-100 text-green-800"; // very mild
    case 2:
      return "bg-lime-100 text-lime-800"; // mild
    case 3:
      return "bg-yellow-100 text-yellow-800"; // moderate
    case 4:
      return "bg-orange-100 text-orange-800"; // high
    case 5:
      return "bg-red-100 text-red-800"; // severe
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const TableSymptoms = () => {
  const [data, setData] = useState<Symptom[]>([]);

  const handleSymptomsRequest = () => {
    fetch(
      `${import.meta.env.VITE_API_URL}/dashboard/symptomData/${sessionStorage.getItem("userId")}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: sessionStorage.getItem("userId") }),
      },
    )
      .then((res) => res.json())
      .then((data: Symptom[]) => {
        setData(data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    handleSymptomsRequest();
  }, []);

  const handleDelete = (id: number) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  const handleEdit = (symptom: Symptom) => {
    console.log("Edit clicked:", symptom);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-white/70 backdrop-blur-md rounded-3xl p-10 shadow-xl h-[65vh] flex flex-col">
      <h2 className="text-2xl font-semibold text-[#0f3d2e] mb-8">
        Symptoms Log
      </h2>

      <div className="flex-1 overflow-auto">
        <table className="w-full text-left border-separate border-spacing-y-3">
          <thead>
            <tr className="text-sm text-gray-500">
              <th className="pb-3">Symptom</th>
              <th className="pb-3">Severity</th>
              <th className="pb-3">Time</th>
              <th className="pb-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 && (
              <tr className="text-center text-gray-400 py-10">
                <td colSpan={4}>No symptoms recorded yet.</td>
              </tr>
            )}

            {data.map((item) => (
              <tr
                key={item.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition"
              >
                <td className="px-4 py-4 font-medium text-[#0f3d2e] rounded-l-2xl">
                  {item.symptom}
                </td>

                <td className="px-4 py-4">
                  <span
                    className={`px-3 py-1 text-xs rounded-full font-medium ${severityColor(
                      item.severity,
                    )}`}
                  >
                    {item.severity}/5
                  </span>
                </td>

                <td className="px-4 py-4 text-gray-500 text-sm">
                  {formatDate(new Date(item.creation_date))}
                </td>

                <td className="px-4 py-4 text-right rounded-r-2xl">
                  <div className="flex justify-end gap-4">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-green-600 hover:cursor-pointer transition"
                    >
                      <FaEdit size={20} />
                    </button>

                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-500 hover:cursor-pointer transition"
                    >
                      <FaTrash size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableSymptoms;
