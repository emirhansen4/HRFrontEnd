import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { MoonLoader } from "react-spinners";
import { authLogin, logOut } from "../../Services/apis/authService";
import { toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setThema } from "../../Redux/Reducers/roleThemaReducer";
import { decode } from "../../Services/JwtDecoder";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Telif Hakkı © "}
      <Link color="inherit" href="https://google.com/">
        TeamPulse
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export const Login = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [wrong, setWrong] = useState(false);
  const navigate = useNavigate();
  const { search } = useLocation();
  const dispatch = useDispatch()
  const queryParams = new URLSearchParams(search);
  const error = queryParams.get('error');
  const handleChange = () => {
    setWrong(false);
  };
  useEffect(() => {
    logOut();
    if(error)
      toast.error("Yetksiz giriş.")
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    const data = new FormData(event.currentTarget);
    setLoading(true);
    authLogin(data.get("email"), data.get("password"), (message, error) => {
      setLoading(false);
      if (message) {
        dispatch(setThema(decode().currentRole))
        toast.success("Giriş yapıldı. Hoşgeldiniz");
        navigate("/home");
      } else if(error){
        setWrong(true);
        toast.error(error);
      }else{
        toast.warning("Bir sorun oluştu tekrar deneyiniz")
      }
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          sm={false}
          md={7}
          sx={{
            backgroundImage: `url(${"src/assets/meeting.jpg"})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid
          item
          xs={12}
          sm={12}
          md={5}
          component={Paper}
          elevation={6}
          square
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: loading ? "rgba(0, 0, 0, 0.8)" : "none",
                zIndex: 3,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                pointerEvents: loading ? "auto" : "none",
              }}
            >
              <MoonLoader
                color="#4caf50"
                loading={loading}
                cssOverride={{ zIndex: 45 }}
              />
            </div>
            <img
              src="https://i.ibb.co/ZdT44JV/Team-Pulse-Text.png"
              alt="Logo"
              style={{
                marginTop: "40px",
                width: "450px",
                height: "auto",
                marginBottom: "55px",
              }}
            />

            <Avatar sx={{ m: 1, bgcolor: "green" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Giriş Yap
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1, width: "60%" }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Mail Adresi"
                name="email"
                autoComplete="email"
                autoFocus
                error={wrong}
                helperText={errorMessage}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Şifre"
                error={wrong}
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onMouseDown={() => setShowPassword((prev) => !prev)}
                        onMouseUp={() => setShowPassword((prev) => !prev)}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="success" />}
                label="Beni Hatırla"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="success"
                sx={{ mt: 2 }}
              >
                Giriş Yap
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link
                    href="/passwordReset"
                    variant="body2"
                    sx={{
                      color: "black",
                      textDecorationColor: "black",
                      "&:hover": { color: "DarkSlateGray" },
                    }}
                  >
                    Şifrenizi mi unuttunuz?
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 25, height: "20px" }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
