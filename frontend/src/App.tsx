import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import PrivateRoute from "./routes/PrivateRoute";

import Home from "./components/Home/Home";
import DashboardPage from "./components/DashboardPage/DashboardPage";

const App = () => {
  return (
    <div className="w-screen h-screen flex flex-col gap-2 justify-center items-center">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
