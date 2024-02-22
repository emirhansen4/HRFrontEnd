// PersonalInfoCard.jsx
import React from "react";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Grid from "@mui/material/Grid";
import { Paper } from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";
import ModeOfTravelIcon from "@mui/icons-material/ModeOfTravel";
import CakeIcon from "@mui/icons-material/Cake";

const PersonalInfoCard = ({ data }) => {
  const shouldShowMiddleName =
    data.middleName !== null && data.middleName !== "";
  const shouldShowSecondLastName =
    data.secondLastName !== null && data.secondLastName !== "";

  return (
    <Paper
      elevation={5}
      sx={{
        margin: 1,
        padding: 5,
        transition: "all 0.5s ease-in-out",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: "background.main",
        borderRadius: 4,
        boxShadow: "0px 4px 18px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: 2, fontFamily: "Roboto" }}>
        Kişisel Bilgiler
      </Typography>
      <Divider sx={{ marginBottom: 2 }} />

      <Grid container spacing={5}>
        {shouldShowMiddleName && (
          <Grid item xs={12} md={8}>
            <Typography variant="h6" sx={{ fontFamily: "Roboto" }}>
              <strong>İkinci Ad:</strong> {data.middleName || "Veri Yok"}
            </Typography>
          </Grid>
        )}
        {shouldShowSecondLastName && (
          <Grid item xs={12} md={8}>
            <Typography variant="h6" sx={{ fontFamily: "Roboto" }}>
              <strong>İkinci Soyad:</strong>{" "}
              {data.secondLastName || "Veri Yok"}
            </Typography>
          </Grid>
        )}
        <Grid item xs={12} md={8}>
          <Typography variant="h6" sx={{ fontFamily: "Roboto", display: 'flex', alignItems: 'center' }}>
            <CakeIcon sx={{ marginRight: 1 }} />
            <strong>Doğum Tarihi:</strong>{" "}
            {data.birthDate ? new Date(data.birthDate).toLocaleDateString("tr-TR") : "Veri Yok"}
          </Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h6" sx={{ fontFamily: "Roboto", display: 'flex', alignItems: 'center' }}>
            <ModeOfTravelIcon sx={{ marginRight: 1 }} />
            <strong>Doğum Yeri:</strong> {data.placeOfBirth || "Veri Yok"}
          </Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h6" sx={{ fontFamily: "Roboto", display: 'flex', alignItems: 'center' }}>
            <FaceIcon sx={{ marginRight: 1 }} />
            <strong>TC Kimlik Numarası:</strong>{" "}
            {data.trIdentityNumber || "Veri Yok"}
          </Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h6" sx={{ fontFamily: "Roboto", display: 'flex', alignItems: 'center' }}>
            <LocationOnIcon sx={{ marginRight: 1 }} />
            <strong>Adres:</strong>{" "}
            {data.address
              ? `${data.county} ${data.city} ${data.address}`
              : "Veri Yok"}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PersonalInfoCard;
