import React from "react";
import {
  Button,
  Container,
  Typography,
  Box,
  Paper,
  Grid,
} from "@mui/material";
import { Block as BlockIcon, Home as HomeIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { decode } from "../Services/JwtDecoder";

const AccessDenied = () => {
  // Decode the JWT token
  const decodedToken = decode();
  const userRole = decodedToken.currentRole;

  const navigate = useNavigate();

  return (
    <Container>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        height="70vh"
      >
        <Paper
          elevation={5}
          sx={{
            padding: "5rem",
            textAlign: "center",
            maxWidth: "80vw",
            borderRadius: "8px",
          }}
        >
          <Box>
            <BlockIcon sx={{ fontSize: "12rem", color: "error.main" }} />
          </Box>
          <Typography variant="h4" color="error.main" mt={2}>
            Yetkisiz Erişim
          </Typography>
          <Typography variant="body1" mt={2} sx={{fontSize:"1.5rem"}}>
            Bu sayfaya erişim yetkiniz bulunmamaktadır.
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={10}>
            Giriş yaptığınız hesabın rolü: {userRole}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<HomeIcon />}
            onClick={() => navigate("/home")}
            sx={{ marginTop: "1rem" }}
          >
            Ana Sayfaya Dön
          </Button>
        </Paper>
      </Grid>
    </Container>
  );
};

export default AccessDenied;
