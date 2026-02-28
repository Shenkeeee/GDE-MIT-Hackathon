import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AddFoodModal = ({ open, onClose, userId }) => {
  const [foodName, setFoodName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [creationDate, setCreationDate] = useState(
    new Date().toISOString().slice(0, 16), // "YYYY-MM-DDTHH:mm" format for datetime-local
  );

  const handleAddFood = () => {
    if (!foodName) {
      alert("Please enter a food name");
      return;
    }

    fetch(`${import.meta.env.VITE_API_URL}/dashboard/addfood/${userId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: userId,
        food_name: foodName,
        quantity,
        creation_date: new Date(creationDate).toISOString(), // convert back to ISO
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "error") {
          alert(`Error: ${data.message}`);
          return;
        }
        alert("Food added successfully!");
        setFoodName("");
        setQuantity(1);
        setCreationDate(new Date().toISOString().slice(0, 16));
        onClose();
      })
      .catch((err) => console.error(err));
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ y: "-50%", x: "-50%", opacity: 0, scale: 0.9 }}
            animate={{ y: "-50%", x: "-50%", opacity: 1, scale: 1 }}
            exit={{ y: "-50%", x: "-50%", opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed top-1/2 left-1/2 z-50 w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl flex flex-col gap-4"
          >
            <h2 className="text-2xl font-bold text-center text-black mb-4">
              Add Food
            </h2>

            <input
              type="text"
              value={foodName}
              onChange={(e) => setFoodName(e.currentTarget.value)}
              placeholder="Food Name"
              className="w-full px-4 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-50"
            />

            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.currentTarget.value))}
              placeholder="Quantity"
              className="w-full px-4 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-50"
            />

            {/* Calendar / datetime picker */}
            <input
              type="datetime-local"
              value={creationDate}
              onChange={(e) => setCreationDate(e.currentTarget.value)}
              className="w-full px-4 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-50"
            />

            <button
              onClick={handleAddFood}
              className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Add Food
            </button>

            <button
              onClick={onClose}
              className="mt-2 text-sm text-gray-500 hover:underline"
            >
              Cancel
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AddFoodModal;
