import React, { useEffect, useState } from "react";
import {
  Switch,
  FormControlLabel,
  Paper,
  Typography,
  Container,
  IconButton,
  Divider,
  Tooltip,
  Zoom,
  Grow,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setCheckboxValue } from "../../../Redux/Reducers/darkModeSwitchReducer";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import LanguageIcon from "@mui/icons-material/Language";

const SettingsPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [switchChange, setswitchChange] = useState(false);
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.darkMode);

  const onDarkModeToggle = (event) => {
    dispatch(setCheckboxValue(event.target.checked));
  };

  useEffect(()=>{
    setIsDarkMode(darkMode)
    setswitchChange(darkMode);
  },[])
  

  useEffect(() => {
    dispatch(setCheckboxValue(isDarkMode));
    if (switchChange) {
      sessionStorage.setItem("DarkMode", JSON.stringify(isDarkMode));
      setswitchChange(true);
    }
  }, [isDarkMode]);

  const handleDarkModeSwitch = () => {
    setIsDarkMode((prev) => !prev);
    setswitchChange(true);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        marginTop: "40px",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Grow in={true} timeout={2000}>
        <Paper elevation={5} sx={{ padding: 8, textAlign: "center", width: "100%" }}>
          <IconButton color="primary" aria-label="Ayarlar">
            <SettingsIcon fontSize="large" />
          </IconButton>
          <Typography variant="h5" gutterBottom>
            Genel Ayarlar
          </Typography>
          <Divider sx={{ marginY: 4 }} />
          <FormControlLabel
            control={<Switch checked={isDarkMode} onChange={handleDarkModeSwitch} />}
            label="Koyu Mod"
          />
          <Divider sx={{ marginY: 4 }} />
          <Typography variant="body2" color="text.primary">
            Görünüm tercihinizi seçin.
          </Typography>
          <IconButton color="primary" onClick={() => onDarkModeToggle({ target: { checked: !isDarkMode } })}>
            {isDarkMode ? <Brightness7Icon fontSize="large" /> : <Brightness4Icon fontSize="large" />}
          </IconButton>
        </Paper>
      </Grow>
    </Container>
  );
};

export default SettingsPage;
