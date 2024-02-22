import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import LinearProgress from "@mui/material/LinearProgress";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import EmailIcon from "@mui/icons-material/Email";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useDispatch, useSelector } from "react-redux";
import {
  sendMail,
  sendCode,
  refreshPassword,
} from "../../../Services/apis/passwordResetService";

const PasswordResetPage = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEmailSending, setIsEmailSending] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResetSuccess, setIsResetSuccess] = useState(false);
  const [timer, setTimer] = useState(180);

  useEffect(() => {
    if (isEmailSent) {
      let interval;

      if (timer > 0) {
        interval = setInterval(() => {
          setTimer((prevTimer) => prevTimer - 1);
        }, 1000);
      } else {
        setIsResetSuccess(false);
        setActiveStep((prevStep) => prevStep + 1);
      }

      return () => clearInterval(interval);
    }
  }, [timer, isEmailSent]);

  const formatTimer = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes} dakika ${seconds} saniye`;
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsEmailSending(true);
    sendMail(email, (message, error) => {
      setIsEmailSending(false);
      if (error !== null) {
      } else {
        setIsEmailSent(true);
        setActiveStep((prevStep) => prevStep + 1);
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (activeStep == 1) {

      sendCode({ sCode: code, email: email }, (message, error) => {
        setIsSubmitting(false);
        if (error !== null) {
        } else {
          if (message === true) {
            setIsResetSuccess(true);
            setActiveStep((prevStep) => prevStep + 1);
            setIsEmailSent(false);
          }
        }
      });
    } else if (activeStep == 2) {
      refreshPassword(
        {
          email: email,
          password: newPassword,
          confirmPassword: confirmPassword,
        },
        (message, error) => {
          setIsSubmitting(false);
          if (error !== null) {
          } else {
            setIsResetSuccess(true);
            setActiveStep((prevStep) => prevStep + 1);
          }
        }
      );
    }
  };

  const handleBackToHome = () => {
    navigate("/login");
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <Container maxWidth="xxl" sx={{ backgroundColor: "primary.main" }}>
        <Toolbar disableGutters>
          <img
            src="https://i.ibb.co/G9mmRQd/1a08f6f0-c084-4b5c-b05f-94b2dfe404be-removebg-preview-copy.png"
            alt="Logo"
            style={{ width: "50px", height: "50px" }}
          />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              marginLeft: 2,
              flexGrow: 1,
              fontSize: "1.4rem",
              display: { md: "flex" },
              fontFamily: "Century Gothic",
              color: "#d2f5e3",
              textDecoration: "none",
              letterSpacing: "1px",
              textShadow: "0px 0px 24px rgba(0, 0, 0, 0.1)",
            }}
          >
            TeamPulse
          </Typography>
        </Toolbar>
      </Container>


      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        
        <Grid container justifyContent="center">
        <Button
          variant="outlined"
          color="primary"
          component={Link}
          to="/login"
          startIcon={<ArrowBackIcon />}
          sx={{ position: "absolute", left: 56, top: 86 }}
          onClick={handleBackToHome} // Add onClick event handler
        >
          Giriş Ekranına Dön
        </Button>
          <Grid item xs={12} md={5}>
            <Paper
              elevation={5}
              sx={{
                padding: 6,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: 12,
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              }} 
            >
              <Stepper
                activeStep={activeStep}
                alternativeLabel
                sx={{ marginBottom: 8 }}
              >
                <Step>
                  <StepLabel>Email Gönder</StepLabel>
                </Step>
                <Step>
                  <StepLabel>Doğrulama Kodu</StepLabel>
                </Step>
                <Step>
                  <StepLabel>Yeni Şifre</StepLabel>
                </Step>
                <Step>
                  <StepLabel>İşlem Tamamlandı</StepLabel>
                </Step>
              </Stepper>
              {activeStep === 0 && (
                <>
                  {isEmailSent ? (
                    <>
                      <CheckCircleIcon
                        color="success"
                        sx={{ fontSize: 60, marginBottom: 2 }}
                      />
                      <Typography variant="h4" sx={{ marginBottom: 3 }}>
                        Email Gönderildi
                      </Typography>
                      <Alert severity="success" sx={{ marginBottom: 2 }}>
                        <AlertTitle>Email Gönderildi</AlertTitle>
                        Şifre sıfırlama bağlantısı email adresinize gönderildi.
                      </Alert>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={handleBackToHome}
                        sx={{ borderRadius: 8, marginTop: 2 }}
                      >
                        Anasayfaya Dön
                      </Button>
                    </>
                  ) : (
                    <>
                      <EmailIcon
                        color="primary"
                        sx={{ fontSize: 60, marginBottom: 2 }}
                      />
                      <Typography variant="h4" sx={{ marginBottom: 3 }}>
                        Şifremi Unuttum
                      </Typography>
                      {isEmailSending && (
                        <LinearProgress sx={{ width: "100%" }} />
                      )}
                      {!isEmailSending && (
                        <form
                          onSubmit={handleFormSubmit}
                          style={{ width: "100%" }}
                        >
                          <TextField
                            label="Email Adresi"
                            type="email"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            onChange={handleEmailChange}
                            value={email}
                            required
                          />
                          <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{ borderRadius: 8, marginTop: 2 }}
                          >
                            {isEmailSending ? "Gönderiliyor..." : "Gönder"}
                          </Button>
                        </form>
                      )}
                    </>
                  )}
                </>
              )}

              {activeStep === 1 && (
                <>
                  <>
                    <LockIcon
                      color="primary"
                      sx={{ fontSize: 60, marginBottom: 2 }}
                    />
                    <Typography variant="h4" sx={{ marginBottom: 3 }}>
                      Doğrulama Kodu
                    </Typography>
                    {isSubmitting && <LinearProgress sx={{ width: "100%" }} />}
                    {!isSubmitting && (
                      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                        <Typography variant="body2" sx={{ marginBottom: 2 }}>
                          Email adresinize gönderilen doğrulama kodunu giriniz.
                        </Typography>
                        <TextField
                          label="Doğrulama Kodu"
                          type="text"
                          fullWidth
                          margin="normal"
                          variant="outlined"
                          onChange={handleCodeChange}
                          value={code}
                          required
                        />
                        <Typography
                          variant="body2"
                          sx={{ marginTop: 1, color: "textSecondary" }}
                        >
                          Şifre sıfırlama için kalan süre: {formatTimer()}
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={((180 - timer) / 180) * 100}
                          sx={{ marginTop: 2, height: 8, borderRadius: 4 }}
                        />
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          sx={{ borderRadius: 8, marginTop: 2 }}
                        >
                          {isSubmitting ? "Sıfırlanıyor..." : "Doğrula"}
                        </Button>
                      </form>
                    )}
                  </>
                </>
              )}

              {activeStep === 2 && (
                <>
                  <>
                    {isResetSuccess ? (
                      <>
                        <LockIcon
                          color="primary"
                          sx={{ fontSize: 60, marginBottom: 2 }}
                        />
                        <Alert severity="success" sx={{ marginBottom: 4 }}>
                          <AlertTitle>Doğrulama Başarılı</AlertTitle>
                          Doğrulama kodunuz kabul edildi. Yeni şifrenizi
                          giriniz.
                        </Alert>
                        <Typography variant="h4" sx={{ marginBottom: 3 }}>
                          Yeni Şifre
                        </Typography>
                        {isSubmitting && (
                          <LinearProgress sx={{ width: "100%" }} />
                        )}
                        {!isSubmitting && (
                          <form
                            onSubmit={handleSubmit}
                            style={{ width: "100%" }}
                          >
                            <TextField
                              label="Yeni Şifre"
                              type="password"
                              fullWidth
                              margin="normal"
                              variant="outlined"
                              onChange={handleNewPasswordChange}
                              value={newPassword}
                              required
                            />
                            <TextField
                              label="Yeni Şifre Tekrar"
                              type="password"
                              fullWidth
                              margin="normal"
                              variant="outlined"
                              onChange={handleConfirmPasswordChange}
                              value={confirmPassword}
                              required
                            />
                            <Button
                              type="submit"
                              variant="contained"
                              color="primary"
                              sx={{ borderRadius: 8, marginTop: 2 }}
                            >
                              {isSubmitting
                                ? "Sıfırlanıyor..."
                                : "Şifreyi Sıfırla"}
                            </Button>
                          </form>
                        )}
                      </>
                    ) : (
                      <>
                        <Typography variant="h4" sx={{ marginBottom: 3 }}>
                          Şifre Sıfırlama Başarısız
                        </Typography>
                        <Alert severity="error" sx={{ marginBottom: 2 }}>
                          <AlertTitle>Şifre sıfırlama başarısız</AlertTitle>
                          Süreniz doldu veya Yanlış kod girdiniz. Lütfen tekrar
                          deneyiniz.
                        </Alert>
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => setActiveStep(0)}
                          sx={{ borderRadius: 8, marginTop: 2 }}
                        >
                          Sıfırlama işlemini yeniden dene
                        </Button>
                      </>
                    )}
                  </>
                </>
              )}

              {activeStep === 3 && (
                <>
                  <CheckCircleIcon
                    color="success"
                    sx={{ fontSize: 60, marginBottom: 2 }}
                  />
                  <Typography variant="h4" sx={{ marginBottom: 3 }}>
                    İşlem Tamamlandı
                  </Typography>
                  <Alert severity="success" sx={{ marginBottom: 2 }}>
                    <AlertTitle>İşlem Tamamlandı</AlertTitle>
                    Şifre sıfırlama işlemi başarıyla tamamlandı.
                  </Alert>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleBackToHome}
                    sx={{ borderRadius: 8, marginTop: 2 }}
                  >
                    Anasayfaya Dön
                  </Button>
                </>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          padding: "0.7rem",
          textAlign: "center",
          backgroundColor: "#1100ff05",
          borderTop: "1px solid #ddd",
          marginTop: "auto",
        }}
      >
        <Typography variant="body2">© 2024 TeamPulse</Typography>
      </Box>
    </Box>
  );
};

export default PasswordResetPage;
