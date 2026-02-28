import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RegisterModalProps {
  open: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

const RegisterModal = ({
  open,
  onClose,
  onSwitchToLogin,
}: RegisterModalProps) => {
  const [firstname, setFirstname] = useState("Matt");
  const [lastname, setLastname] = useState("Percy");
  const [email, setEmail] = useState("a@b.c");
  const [password, setPassword] = useState("Somethin");

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (open) {
      window.addEventListener("keydown", handleEsc);
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [open, onClose]);

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

          alert("Successful registration");
          onClose();
        }
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
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ y: "-50%", x: "-50%", opacity: 0, scale: 0.9 }}
            animate={{ y: "-50%", x: "-50%", opacity: 1, scale: 1 }}
            exit={{ y: "-50%", x: "-50%", opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="fixed top-1/2 left-1/2 z-50 w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl flex flex-col gap-4"
          >
            <h2 className="text-2xl font-bold text-center text-green-700">
              Create Your Account
            </h2>

            {/* First Name */}
            <input
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              placeholder="First Name"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none bg-gray-50"
            />

            {/* Last Name */}
            <input
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              placeholder="Last Name"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none bg-gray-50"
            />

            {/* Email (3rd) */}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none bg-gray-50"
            />

            {/* Password */}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none bg-gray-50"
            />

            <button
              onClick={handleRegister}
              className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
            >
              Register
            </button>

            <button
              onClick={() => {
                onClose();
                handleGuestRegister();
              }}
              className="w-full py-2 border border-green-600 text-green-700 rounded-lg hover:bg-green-50 transition"
            >
              Continue as Guest
            </button>

            <div className="border-t pt-4 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <button
                onClick={() => {
                  onClose();
                  onSwitchToLogin();
                }}
                className="text-green-700 hover:underline font-medium"
              >
                Login here
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default RegisterModal;