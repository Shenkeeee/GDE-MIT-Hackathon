import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AddSymptomModal = ({ open, onClose, userId }) => {
  const [symptom, setSymptom] = useState("");
  const [severity, setSeverity] = useState(1);
  const [creationDate, setCreationDate] = useState(
    new Date().toISOString().slice(0, 16), // "YYYY-MM-DDTHH:mm" format
  );

  const handleAddSymptom = () => {
    if (!symptom) {
      alert("Please enter a symptom");
      return;
    }

    fetch(`${import.meta.env.VITE_API_URL}/dashboard/addsymp/${userId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: userId,
        symptom,
        severity,
        creation_date: new Date(creationDate).toISOString(),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "error") {
          alert(`Error: ${data.message}`);
          return;
        }
        alert("Symptom added successfully!");
        setSymptom("");
        setSeverity(1);
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
              Add Symptom
            </h2>

            <input
              type="text"
              value={symptom}
              onChange={(e) => setSymptom(e.currentTarget.value)}
              placeholder="Symptom Name"
              className="w-full px-4 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 bg-gray-50"
            />

            <select
              value={severity}
              onChange={(e) => setSeverity(Number(e.currentTarget.value))}
              className="w-full px-4 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 bg-gray-50"
            >
              <option value={1}>Severity 1 (Mild)</option>
              <option value={2}>Severity 2</option>
              <option value={3}>Severity 3 (Moderate)</option>
              <option value={4}>Severity 4</option>
              <option value={5}>Severity 5 (Severe)</option>
            </select>

            <input
              type="datetime-local"
              value={creationDate}
              onChange={(e) => setCreationDate(e.currentTarget.value)}
              className="w-full px-4 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 bg-gray-50"
            />

            <button
              onClick={handleAddSymptom}
              className="w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Add Symptom
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

export default AddSymptomModal;
