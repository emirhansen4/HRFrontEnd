import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import PhoneIcon from "@mui/icons-material/Phone";

const ContactInfoCard = ({ data }) => {
  const isValidPhoneNumber = data.phoneNumber && data.phoneNumber.length === 10 && /^\d+$/.test(data.phoneNumber);

  return (
    <Paper
      elevation={5}
      sx={{
        margin: 1,
        padding: 4,
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
        İletişim Bilgileri
      </Typography>
      <Divider sx={{ marginBottom: 2 }} />
      <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', fontFamily: "Roboto" }}>
        <ContactMailIcon sx={{ marginRight: 1 }} />
        <strong>E-posta:</strong> {data.email || "Veri Yok"}
      </Typography>
      <Divider sx={{ marginY: 2 }} />
      <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', fontFamily: "Roboto" }}>
        <PhoneIcon sx={{ marginRight: 1 }} />
        <strong>Telefon:</strong>{" "}
        {isValidPhoneNumber ? (
          `${data.phoneNumber.slice(0, 1)} 
          (${data.phoneNumber.slice(1, 4)}) 
          ${data.phoneNumber.slice(4, 7)} 
          ${data.phoneNumber.slice(7, 9)} 
          ${data.phoneNumber.slice(9, 11)}`
        ) : (
          "Geçersiz Telefon Numarası"
        )}
      </Typography>
    </Paper>
  );
};

export default ContactInfoCard;
