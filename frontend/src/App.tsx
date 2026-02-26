import { useState } from "react";
import "./App.css";

import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import WelcomeContent from "./components/WelcomeContent/WelcomeContent";
import Login from "./components/Login/Login";

const App = () => {
  const [isLoginActive, setIsLoginActive] = useState(false);

  return (
    <div className="w-screen h-screen flex flex-col gap-2 justify-center items-center">
      <Header />

      {!isLoginActive && <WelcomeContent setIsLoginActive={setIsLoginActive} />}
      {isLoginActive && <Login />}

      <Footer />
    </div>
  );
};

export default App;
