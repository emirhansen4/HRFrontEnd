// main.jsx

import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.jsx";
import "./index.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import { store } from "./Redux/app/Store.jsx";
import { decode } from "./Services/JwtDecoder.jsx";

const transitionDuration = "0.3s"; 

const userTheme = createTheme({
  palette: {
    primary: {
      main: "#2196f3", // Material Blue
    },
    card: {
      backgroundMain: "#ffffff", // White
      backgroundSecondary: "#f5f5f5", // Light Gray
    },
    background: {
      paper: "#f0f0f0", // Off-White
      default: "#ffffff", // White
    },
    text: {
      primary: "#333333", // Dark Gray
    },
  },
  transitions: {
    // Add transition effects for color changes
    create: () => `background-color ${transitionDuration} ease-in-out`,
  },
});

// !!  admin color palette  !! //
const adminTheme = createTheme({
  palette: {
    primary: {
      main: "#8bc34a", // Lime Green
    },
    card: {
      backgroundMain: "#f1f8e9", // Light Lime Green
      backgroundSecondary: "#dcedc8", // Pale Lime Green
    },
    background: {
      paper: "#f9fbe7", // Pale Lime
      default: "#ffffff", // White
    },
    text: {
      primary: "#333333", // Dark Gray
    },
  },
  transitions: {
    // Add transition effects for color changes
    create: () => `background-color ${transitionDuration} ease-in-out`,
  },
});

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#525252",
    },
    card: {
      backgroundMain: "#525252",
      backgroundSecondary: "#414141",
    },
    background: {
      paper: "#414141",
      default: "#313131",
    },
    text: {
      primary: "#D8D8D8",
    },
  },
  transitions: {
    // Add transition effects for color changes
    create: () => `background-color ${transitionDuration} ease-in-out`,
  },
});

const AppWrapper = () => {
  const [isDark, setIsDark] = useState(false);
  const [role, setRole] = useState("User");

  function changeThema(themaMode, thema) {
    setIsDark(themaMode);
    setRole(thema)
  }
  return (
    <>
      <ThemeProvider
        theme={isDark ? darkTheme : role === "Admin" ? adminTheme : userTheme}
      >
        <Provider store={store}>
          <App changeThema={changeThema} />
        </Provider>
      </ThemeProvider>
    </>
  );
};

// Use createRoot().render() to properly render the root component
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
