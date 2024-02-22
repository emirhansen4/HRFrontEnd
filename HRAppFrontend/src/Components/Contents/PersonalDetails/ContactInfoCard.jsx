// ContactInfoCard.jsx
import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";


const ContactInfoCard = ({ data }) => {
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
        <AlternateEmailIcon sx={{ marginRight: 1, color: "text.primary" }} />
        İletişim Bilgileri
      </Typography>
      <Divider sx={{ marginBottom: 2 }} />
      <Typography variant="h6" sx={{ color: "text.primary" }}>
        <strong>Email:</strong> {data.email || "Veri yok"}
      </Typography>
      <Divider sx={{ marginY: 1 }} />
      <Typography variant="h6" sx={{ color: "text.primary" }}>
        <strong>Telefon:</strong>{" "}
        {data.phoneNumber
          ? data.phoneNumber.length < 10
            ? "Geçerli telefon numarası bulunmamaktadır."
            : `${data.phoneNumber.slice(0, 1)} 
            (${data.phoneNumber.slice(1, 4)}) 
            ${data.phoneNumber.slice(4, 7)} 
            ${data.phoneNumber.slice(7, 9)} 
            ${data.phoneNumber.slice(9, 11)}`
          : "Veri yok"}
      </Typography>
      <Divider sx={{ marginY: 1 }} />
      <Typography variant="h6" sx={{ color: "text.primary" }}>
        <strong>Adres:</strong>{" "}
        {data.address
          ? data.address.length < 20
            ? `Geçerli adres bulunmamaktadır.`
            : `${data.address} - ${data.county} / ${data.city}`
          : "Veri yok"}
      </Typography>
    </Paper>
  );
};

export default ContactInfoCard;
