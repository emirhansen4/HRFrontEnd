import { Header } from "./Header/Header.jsx";
import { Sidebar } from "./Sidebar/Sidebar.jsx";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import React, { useEffect, useState } from "react";
import { Navigate, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./Contents/Home/Home.jsx";
import Profile from "./Contents/Profile/Profile.jsx";
import ProfileUpdate from "./Contents/ProfileUpdate/ProfileUpdate.jsx";
import AddPersonal from "./Contents/AddPersonal/AddPersonal.jsx";
import PersonnelList from "./Contents/PersonnelList/PersonnelList.jsx";
import PersonalDetails from "./Contents/PersonalDetails/PersonalDetails.jsx";
import EditPersonal from "./Contents/EditPersonal/EditPersonal.jsx";
import PasswordChange from "./Contents/PasswordChange/PasswordChange.jsx";
import Contact from "./Contact.jsx";
import SettingsPage from "./Contents/Settings/SettingsPage.jsx";
import RequestForm from "./Contents/RequestForm/RequestForm.jsx";
import RequestView from "./Contents/RequestView/RequestView.jsx";
import { useDispatch } from "react-redux";
import { setCheckboxValue } from "../Redux/Reducers/darkModeSwitchReducer.jsx";
import QuickRequests from "./Contents/Home/QuickRequest.jsx";
import ListCompanies from "./Contents/SiteOwnerSide/SiteOwnerHome/ListCompanies.jsx";
import AddCompany from "./Contents/SiteOwnerSide/AddCompany/AddCompany.jsx";
import EditCompany from "./Contents/SiteOwnerSide/EditCompany.jsx/EditCompany.jsx";
import AccessDenied from "./AccessDenied.jsx";
import { decode } from "../Services/JwtDecoder.jsx";

export const Template = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [isMailVerified, setIsMailVerified] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("auth") !== "false";
    if (!isAuthenticated) {
      navigate("/login");
    }
    setIsAdmin(decode().currentRole === "Admin");
    setIsOwner(decode().currentRole === "SiteAdmin");
    setIsMailVerified(decode().emailConfirmed === "True");
  }, []);

  useEffect(() => {
    const darkModeCondition = sessionStorage.getItem("DarkMode");
    if (darkModeCondition == "true") dispatch(setCheckboxValue(true));
  }, []);

  return (
    <Box sx={{ transition: "all 0.5s ease-in-out" }}>
      <CssBaseline />
      <Header />
      <Sidebar />
      <Box
        component="main"
        sx={{
          marginLeft: { sm: "240px" },
          transition: "all 0.5s ease-in-out",
        }}
      >
        <Toolbar />
        <Routes>
          {isMailVerified ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profileChange" element={<ProfileUpdate />} />
              <Route path="/request" element={<RequestForm />} />
              <Route
                path="/profile/passwordChange"
                element={<PasswordChange />}
              />
              <Route path="/contact" element={<Contact />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/quickRequests" element={<QuickRequests />} />
            </>
          ) : (
            <>
              <Route path="/" element={<PasswordChange />} />
              <Route path="/home" element={<PasswordChange />} />
              <Route path="/profile" element={<PasswordChange />} />
              <Route path="/profileChange" element={<PasswordChange />} />
              <Route path="/request" element={<PasswordChange />} />
              <Route
                path="/profile/passwordChange"
                element={<PasswordChange />}
              />
              <Route path="/contact" element={<PasswordChange />} />
              <Route path="/settings" element={<PasswordChange />} />
              <Route path="/quickRequests" element={<PasswordChange />} />
            </>
          )}

          {isAdmin ? (
            isMailVerified ? (
              <>
                <Route path="/addPersonal" element={<AddPersonal />} />
                <Route path="/personnelList" element={<PersonnelList />} />
                <Route
                  path="/personnelList/personalDetails/:id"
                  element={<PersonalDetails />}
                />
                <Route
                  path="/personnelList/personalEdit/:id"
                  element={<EditPersonal />}
                />
                <Route path="/requestView" element={<RequestView />} />
              </>
            ) : (
              <>
                <Route path="/addPersonal" element={<PasswordChange />} />
                <Route path="/personnelList" element={<PasswordChange />} />
                <Route
                  path="/personnelList/personalDetails/:id"
                  element={<PasswordChange />}
                />
                <Route
                  path="/personnelList/personalEdit/:id"
                  element={<PasswordChange />}
                />
                <Route path="/requestView" element={<PasswordChange />} />
              </>
            )
          ) : null}

          {isOwner ? (
            <>
              <Route path="/listCompanies" element={<ListCompanies />} />
              <Route path="/addCompany" element={<AddCompany />} />
              <Route path="/editCompany/:id" element={<EditCompany />} />
            </>
          ) : (
            <>
              <Route path="/listCompanies" element={<AccessDenied />} />
              <Route path="/addCompany" element={<AccessDenied />} />
              <Route path="/editCompany/:id" element={<AccessDenied />} />
            </>
          )}
        </Routes>
      </Box>
    </Box>
  );
};
