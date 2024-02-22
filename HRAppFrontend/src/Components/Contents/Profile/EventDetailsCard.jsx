// EventDetailsCard.jsx
import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import EventIcon from "@mui/icons-material/Event";

const EventDetailsCard = ({ data }) => {
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
      <Typography variant="h5" sx={{ marginBottom: 1, fontFamily: "Roboto" }}>
        Etkinlik Detayları
      </Typography>
      <Divider sx={{ marginBottom: 2 }} />
      <Typography variant="h6" sx={{ fontFamily: "Roboto" }}>
        <EventIcon sx={{ marginRight: 1 }} />
        <strong>Son Etkinlik:</strong> {data.lastEvent || "Veri Yok"}
      </Typography>
      <Divider sx={{ marginY: 1 }} />
      <Typography variant="h6" sx={{ fontFamily: "Roboto" }}>
        {/* Buraya daha fazla etkinlik detayı eklenebilir */}
      </Typography>
    </Paper>
  );
};

export default EventDetailsCard;
