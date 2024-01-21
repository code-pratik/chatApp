import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

export const PrivateRoutes = ({ element }) => {
  const authToken = Cookies.get("authToken");

  if (!authToken) {
    return <Navigate to="/login" />;
  }

  try {
    const decodedToken = authToken.split(".")[1];
    const expirationTime = JSON.parse(atob(decodedToken)).exp;

    if (!(expirationTime < Date.now() / 1000)) {
      return <Navigate to="/login" />;
    }
  } catch (error) {
    console.error("Token decoding error:", error);
    return <Navigate to="/login" />;
  }

  return element;
};
