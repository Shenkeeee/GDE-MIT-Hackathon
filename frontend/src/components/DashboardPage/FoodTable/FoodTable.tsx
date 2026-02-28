import { useEffect, useState } from "react";

import { FaEdit, FaTrash } from "react-icons/fa";

type Food = {
  id: number;
  user_id: number;
  food_name: string;
  ingredients: string;
  allergens: string;
  quantity: string;
  creation_date: string;
};

const ingredientsColor = (ingredients: string) => {
  switch (ingredients.toLowerCase()) {
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
  const [data, setData] = useState<Food[]>([]);

  const handleFoodTableRequest = () => {
    fetch(
      `${import.meta.env.VITE_API_URL}/dashboard/fooddata/${sessionStorage.getItem("userId")}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: sessionStorage.getItem("userId") }),
      },
    )
      .then((res) => res.json())
      .then((data: Food[]) => {
        setData(data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    handleFoodTableRequest();
  }, []);

  const handleDelete = (id: number) => {
    // later -> call backend
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  const handleEdit = (food: Food) => {
    // later -> open modal / route
    console.log("Edit clicked:", food);
  };

  const formatDate = (date: Date) => {
    const formatted = date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    return formatted;
  };

  return (
    <div className="bg-white/70 backdrop-blur-md rounded-3xl p-10 shadow-xl h-[65vh] flex flex-col">
      <h2 className="text-2xl font-semibold text-[#0f3d2e] mb-8">Food Log</h2>

      <div className="flex-1 overflow-auto">
        <table className="w-full text-left border-separate border-spacing-y-3">
          <thead>
            <tr className="text-sm text-gray-500">
              <th className="pb-3">Food</th>
              <th className="pb-3">Ingredients</th>
              <th className="pb-3">Quantity</th>
              <th className="pb-3">Time</th>
              <th className="pb-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 && (
              <tr className="text-center text-gray-400 py-10">
                <td>No food entries yet.</td>
              </tr>
            )}

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
                    className={`px-3 py-1 text-xs rounded-full font-medium ${ingredientsColor(
                      item.ingredients,
                    )}`}
                  >
                    {item.ingredients}
                  </span>
                </td>

                <td className="px-4 py-4 text-gray-600">{item.quantity}</td>

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

export default TableFood;
