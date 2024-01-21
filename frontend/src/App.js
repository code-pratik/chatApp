import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./layout/layout";
import { ChatApp } from "./pages/chatApp/chatApp";
import { LoginPage } from "./pages/Login/login";
import { PrivateRoutes } from "./hoc/privateRoute";
import Error404 from "./Error/Error404";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/homePage/home";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function App() {
  const theme = useSelector((state) => state.chats?.theme);
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === "dark" ? "light" : "dark");
    root.classList.add(theme === "dark" ? "dark" : "light");
  }, [theme]);

  return (
    <div className="App font-sans ">
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes element={<Layout />} />}>
            <Route path="/chatApp" element={<ChatApp />} />
          </Route>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signUp" element={<LoginPage />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
