// BirthInfoCard.jsx
import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import EventIcon from "@mui/icons-material/Event";


const BirthInfoCard = ({ data }) => {
  return (
    <Paper
      elevation={5}
      sx={{
        padding: 4,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        borderRadius: 12,
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "background.main",
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: 2, color: "text.primary" }}>
        <EventIcon sx={{ marginRight: 1, color: "text.primary" }} />
        Doğum Bilgileri
      </Typography>
      <Divider sx={{ marginBottom: 2 }} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ color: "text.primary" }}>
            <strong>Doğum Tarihi:</strong>{" "}
            {data.birthDate ? new Date(data.birthDate).toLocaleDateString("tr-TR") : "Veri yok"}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ color: "text.primary" }}>
            <strong>Doğum Yeri:</strong> {data.placeOfBirth || "Veri yok"}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ color: "text.primary" }}>
            <strong>TC Kimlik No:</strong>{" "}
            {data.trIdentityNumber || "Veri yok"}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default BirthInfoCard;
