// ProfileHeader.jsx
import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import LockIcon from "@mui/icons-material/Lock";
import Typography from "@mui/material/Typography";
import { Paper } from "@mui/material";

const ProfileHeader = ({ data, navigate }) => {
  return (
    <Paper
      elevation={5}
      sx={{
        margin: 1,
        padding: 1,
        transition: "all 0.5s ease-in-out",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
        color: "text.primary",
        backgroundColor: "background.main",
        borderRadius: 4,
        boxShadow: "0px 4px 18px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Avatar
        alt="Kullanıcı Avatarı"
        src={
          data.filePath
            ? data.filePath
            : "https://cdn.vectorstock.com/i/preview-1x/66/14/default-avatar-photo-placeholder-profile-picture-vector-21806614.jpg"
        }
        sx={{ width: 200, height: 200, marginBottom: 1, marginTop: 2 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/profileChange")}
        startIcon={<EditIcon />}
        sx={{ borderRadius: 4, marginTop: 2 }}
      >
        Kişisel Bilgileri Düzenle
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/profile/passwordChange")}
        startIcon={<LockIcon />}
        sx={{ borderRadius: 4, marginTop: 2 }}
      >
        Şifreni Değiştir
      </Button>
      <Typography
        variant="h2"
        color="text.primary"
        sx={{ marginTop: 3, fontSize: "2rem", fontFamily: "Roboto" }}
      >
        {data.firstName || "Veri Yok"} {data.lastName || "Veri Yok"}
      </Typography>
    </Paper>
  );
};

export default ProfileHeader;
