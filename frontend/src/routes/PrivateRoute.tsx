import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const userId = sessionStorage.getItem("userId"); // check sessionStorage

  if (!userId) {
    // if no userid, redirect to home
    return <Navigate to="/" replace />;
  }

  // if userid exists, render the children
  return children;
};

export default PrivateRoute;
