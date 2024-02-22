// PhotoCard.jsx
import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";


const PhotoCard = ({ data }) => {
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
        <PhotoCameraIcon sx={{ marginRight: 1, color: "text.primary" }} />
        Fotoğraf
      </Typography>
      <Divider sx={{ marginBottom: 2 }} />
      <Avatar
        alt="User Avatar"
        src={data.filePath}
        sx={{ width: 150, height: 150, alignSelf: "center" }}
      />
    </Paper>
  );
};

export default PhotoCard;
