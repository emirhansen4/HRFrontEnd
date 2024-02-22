// PersonalInfoCard.jsx
import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import PersonIcon from "@mui/icons-material/Person";

const PersonalInfoCard = ({ data }) => {
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
        <PersonIcon sx={{ marginRight: 1, color: "text.primary" }} />
        Kişisel Bilgiler
      </Typography>
      <Divider sx={{ marginBottom: 2 }} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ color: "text.primary" }}>
            <strong>Ad:</strong> {data.firstName || "Veri yok"}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ color: "text.primary" }}>
            <strong>İkinci Ad:</strong> {data.middleName || "Veri yok"}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ color: "text.primary" }}>
            <strong>Soyad:</strong> {data.lastName || "Veri yok"}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ color: "text.primary" }}>
            <strong>İkinci Soyad:</strong>{" "}
            {data.secondLastName || "Veri yok"}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PersonalInfoCard;
