import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

const LoginModal = ({ open, onClose }: LoginModalProps) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("a@b.c");
  const [password, setPassword] = useState("Somethin");

  // Close on ESC
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

  const handleLogin = () => {
    fetch(`${import.meta.env.VITE_API_URL}/users/login/${email}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then(
        (data: {
          status: "success" | "error";
          message?: string;
          userId?: string;
        }) => {
          if (data.status === "error") {
            alert(`Login unsuccessful: ${data?.message}`);
            return;
          }

          sessionStorage.setItem("userId", data.userId as string);
          navigate("/dashboard");
        }
      )
      .catch((err) => console.error(err));
  };

  const handleGuestLogin = () => {
    navigate("/dashboard");
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
              Welcome Back
            </h2>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none bg-gray-50"
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none bg-gray-50"
            />

            <button
              onClick={handleLogin}
              className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
            >
              Login
            </button>

            <button
              onClick={() => {
                onClose();
                handleGuestLogin();
              }}
              className="w-full py-2 border border-green-600 text-green-700 rounded-lg hover:bg-green-50 transition"
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

export default LoginModal;