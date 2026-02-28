import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const RegisterModal = ({ open, onClose }) => {
  const [email, setEmail] = useState("a@b.c");
  const [password, setPassword] = useState("Somethin");
  const [firstname, setFirstname] = useState("Matt");
  const [lastname, setLastname] = useState("Percy");

  const handleRegister = () => {
    fetch(`${import.meta.env.VITE_API_URL}/users/register/${email}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        firstname,
        lastname,
      }),
    })
      .then((res) => res.json())
      .then(
        (data: {
          status: "success" | "error";
          message?: string;
          userId?: string;
        }) => {
          if (data.status === "error") {
            alert(`Error when creating: ${data.message}`);
            return;
          }
          // success
          alert(`Succesful registration`);
        },
      )
      .catch((err) => console.error(err));
  };

  const handleGuestRegister = () => {
    alert("Guest flow placeholder");
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
            <h2 className="text-2xl font-bold text-center mb-4">
              Create Your Account
            </h2>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
            />
            <input
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.currentTarget.value)}
              placeholder="First Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
            />
            <input
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.currentTarget.value)}
              placeholder="Last Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
            />

            <button
              onClick={handleRegister}
              className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Register
            </button>

            <button
              onClick={handleGuestRegister}
              className="w-full py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
            >
              Continue as Guest
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

export default RegisterModal;
