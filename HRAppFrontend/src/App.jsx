import "./App.css";
import { useEffect } from "react";
import { Template } from "./Components/Template.jsx";
import { Login } from "./Components/Login/Login.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./Services/interceptors.jsx";
import PasswordResetPage from "./Components/Contents/PasswordResetPage/PasswordResetPage.jsx";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
export const App = ({ changeThema }) => {
  useEffect(() => {
    if (!localStorage.getItem("auth")) {
      localStorage.setItem("auth", JSON.stringify(false));
    }
  }, []);

  const thema = useSelector((state) => state.thema);
  const darkMode = useSelector((state) => state.darkMode);
  
  changeThema(darkMode, thema);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Template />} />
          <Route path="/login" element={<Login />} />
          <Route path="/passwordReset" element={<PasswordResetPage />} />

        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        limit={5}
      />
    </>
  );
};
