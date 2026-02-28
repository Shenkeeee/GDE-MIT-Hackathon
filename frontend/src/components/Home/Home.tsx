import { useState } from "react";

import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";

const Home = () => {
  const [openRegister, setOpenRegister] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {openRegister && (
        <RegisterModal
          open={openRegister}
          onClose={() => setOpenRegister(false)}
          onSwitchToLogin={() => setOpenLogin(true)}
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
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />

      {/* Center Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 text-[#e1fe6b]">
        <h2 className="text-4xl tracking-wide opacity-80 capitalize">
          Bread Cramps
        </h2>

        <h1 className="text-6xl font-bold mt-8 leading-tight">
          Uncover Complete
          <br />
          Wellness and Healing
        </h1>

        <p className="mt-8 text-lg opacity-80 max-w-2xl">
          Follow the bread crumbs to solve the bad cramps.
        </p>

        <button
          onClick={() => setOpenRegister(true)}
          className="mt-10 px-8 py-3 bg-white/10 border border-white/30 backdrop-blur-md rounded-xl hover:bg-white/20 transition text-[#e1fe6b]"
        >
          Let's Start
        </button>
      </div>
    </div>
  );
};

export default Home;
