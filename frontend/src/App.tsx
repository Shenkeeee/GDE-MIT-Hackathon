import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import DashboardPage from "./components/DashboardPage/DashboardPage";

const App = () => {
  return (
    <div className="w-screen h-screen flex flex-col gap-2 justify-center items-center">
      <Header />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </BrowserRouter>

      <Footer />
    </div>
  );
};

export default App;
