import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

type Food = {
  id: number;
  user_id: number;
  food_name: string;
  category: string;
  quantity: string;
  timestamp: string;
};

const initialData: Food[] = [
  {
    id: 1,
    user_id: 101,
    food_name: "Oatmeal",
    category: "Carb",
    quantity: "250g",
    timestamp: "2026-02-27 08:12",
  },
  {
    id: 2,
    user_id: 101,
    food_name: "Greek Yogurt",
    category: "Dairy",
    quantity: "150g",
    timestamp: "2026-02-27 12:45",
  },
  {
    id: 3,
    user_id: 101,
    food_name: "Grilled Chicken",
    category: "Protein",
    quantity: "300g",
    timestamp: "2026-02-27 18:30",
  },
  {
    id: 4,
    user_id: 101,
    food_name: "Broccoli",
    category: "Vegetable",
    quantity: "200g",
    timestamp: "2026-02-27 19:00",
  },
];

const categoryColor = (category: string) => {
  switch (category.toLowerCase()) {
    case "carb":
      return "bg-yellow-100 text-yellow-800";
    case "dairy":
      return "bg-blue-100 text-blue-800";
    case "protein":
      return "bg-red-100 text-red-800";
    case "vegetable":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const TableFood = () => {
  const [data, setData] = useState<Food[]>(initialData);

  const handleDelete = (id: number) => {
    // later → call backend
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  const handleEdit = (food: Food) => {
    // later → open modal / route
    console.log("Edit clicked:", food);
  };

  return (
    <div className="bg-white/70 backdrop-blur-md rounded-3xl p-10 shadow-xl h-full flex flex-col">
      <h2 className="text-2xl font-semibold text-[#0f3d2e] mb-8">Food Log</h2>

      <div className="flex-1 overflow-auto">
        <table className="w-full text-left border-separate border-spacing-y-3">
          <thead>
            <tr className="text-sm text-gray-500">
              <th className="pb-3">Food</th>
              <th className="pb-3">Category</th>
              <th className="pb-3">Quantity</th>
              <th className="pb-3">Time</th>
              <th className="pb-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr
                key={item.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition"
              >
                <td className="px-4 py-4 font-medium text-[#0f3d2e] rounded-l-2xl">
                  {item.food_name}
                </td>

                <td className="px-4 py-4">
                  <span
                    className={`px-3 py-1 text-xs rounded-full font-medium ${categoryColor(
                      item.category,
                    )}`}
                  >
                    {item.category}
                  </span>
                </td>

                <td className="px-4 py-4 text-gray-600">{item.quantity}</td>

                <td className="px-4 py-4 text-gray-500 text-sm">
                  {item.timestamp}
                </td>

                <td className="px-4 py-4 text-right rounded-r-2xl">
                  <div className="flex justify-end gap-4">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-blue-600 hover:cursor-pointer transition"
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

        {data.length === 0 && (
          <div className="text-center text-gray-400 py-10">
            No food entries yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default TableFood;
