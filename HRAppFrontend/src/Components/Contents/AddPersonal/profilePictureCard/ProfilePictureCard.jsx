import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Avatar } from "@mui/material";
import { styled } from "@mui/system";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";


const StyledCard = styled(Paper)({
    padding: "24px",
    borderRadius: "16px",
    transition: "all 0.5s ease-in-out",
    height: "100%",
    width: "100%",
    maxWidth: "400px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  
    "&:hover": {
      boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
    },
  
    ".profile-picture-container": {
      marginTop: "12px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  
    ".profile-picture": {
      borderRadius: "50%",
      width: "100%",
      height: "auto",
      maxWidth: "200px",
    },
  
    ".avatar": {
      width: 100,
      height: 100,
      backgroundColor: "background.paper",
      transition: "all 0.5s ease-in-out",
    },
  
    ".profile-upload": {
      textAlign: "center",
      marginTop: "12px",
    },
  });

  const StyledButton = styled(Button)({
    borderRadius: "8px",
    marginTop: "4px",
    marginBottom: "16px",
    fontSize: "16px",
    background: "background.default",
    color: "text.primary",
    transition: "all 0.5s ease-in-out",
  
    "&:hover": {
      background: "background.paper",
    },
  
    width: "100%",
    maxWidth: "300px",
    margin: "0 auto",
    display: "block",
  });

export const ProfilePictureCard = ({ pictureURL, handleProfilePictureUpload }) => {
    return (
      <StyledCard elevation={5}>
        <div className="profile-picture-container">
          {pictureURL ? (
            <img
              src={pictureURL}
              alt="Profile"
              className="profile-picture"
              style={{ width: "160px", height: "160px", objectFit: "cover" }}
            />
          ) : (
            <Avatar className="avatar">
              <AccountCircleIcon />
            </Avatar>
          )}
        </div>
  
        <div className="profile-upload">
          <Typography variant="h5" sx={{ marginBottom: 10 }}>
            Profil Fotoğrafı Yükle
          </Typography>
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="profile-picture-upload"
            type="file"
            onChange={handleProfilePictureUpload}
          />
          <label htmlFor="profile-picture-upload">
            <StyledButton variant="contained" component="span">
              Fotoğraf Seç
            </StyledButton>
          </label>
        </div>
      </StyledCard>
    );
  };