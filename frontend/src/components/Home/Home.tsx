import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";

import { MdCancel } from "react-icons/md";

const Home = () => {
  const [openAuth, setOpenAuth] = useState(false);

  const [openRegister, setOpenRegister] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {openRegister && (
        <RegisterModal
          open={openRegister}
          onClose={() => setOpenRegister(false)}
        />
      )}

      {openLogin && (
        <LoginModal open={openLogin} onClose={() => setOpenLogin(false)} />
      )}

      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute w-full h-full object-cover"
      >
        <source src="/assets/videos/main-bg.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Center Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-6">
        <h2 className="text-xl md:text-2xl tracking-wide opacity-80">
          Bread Crumbs
        </h2>

        <h1 className="text-4xl md:text-6xl font-bold mt-4">
          Uncover Complete Wellness & Health
        </h1>

        <p className="mt-4 text-sm md:text-base opacity-70 max-w-xl">
          Follow the bread crumbs to breed the crumbs.
        </p>

        <button
          onClick={() => setOpenAuth(true)}
          className="mt-10 px-8 py-3 bg-white/10 border border-white/30 backdrop-blur-md rounded-xl text-white hover:bg-white/20 transition"
        >
          Let's Start
        </button>
      </div>

      {/* Slide-in Auth Sidebar */}
      <AnimatePresence>
        {openAuth && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 z-20"
              onClick={() => setOpenAuth(false)}
            />

            {/* Sidebar from left */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="absolute left-0 top-0 h-full w-80 bg-white z-30 p-8 shadow-2xl flex flex-col"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold">Get Started</h2>
                <MdCancel
                  size={20}
                  className="cursor-pointer"
                  onClick={() => setOpenAuth(false)}
                />
              </div>

              <button
                onClick={() => setOpenRegister(true)}
                className="px-6 py-3 my-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
              >
                Register
              </button>

              <button
                onClick={() => setOpenLogin(true)}
                className="px-6 py-3 my-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
              >
                Login
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
