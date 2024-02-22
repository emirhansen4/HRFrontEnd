import React from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CircularProgress,
  Typography,
  Grid,
} from "@mui/material";
import {
  Email as EmailIcon,
  Home as HomeIcon,
  LocationCity as LocationCityIcon,
  Person as PersonIcon,
  Room as RoomIcon,
} from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { decode } from "../../../Services/JwtDecoder";
import { InfoOutlined } from "@mui/icons-material";

const HomeSummaryCard = ({ profileData, loading }) => {
  const navigate = useNavigate();

  // Decode the JWT token
  const decodedToken = decode();
  const [isOwner, setIsOwner] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(false);

  React.useEffect(() => {
    const decodedRole = decode().currentRole;
    setIsAdmin(decodedRole === "Admin");
    setIsOwner(decodedRole === "SiteAdmin");
  }, []);

  const renderInfoItem = (label, value, icon) => (
    <Grid item xs={12} sm={12}>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          borderRadius: 4,
          padding: "0.6rem",
          backgroundColor: "card.backgroundMain",
          transition: "all 0.5s ease-in-out",
          marginLeft: "2rem",
          boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 1 }}>
          {icon}
          <Typography
            variant="body1"
            fontSize="1rem"
            fontWeight="bold"
            sx={{ marginLeft: 0.4 }}
          >
            {label}
          </Typography>
        </Box>
        <Typography variant="body3" fontSize="1rem">
          {value || "Bilgi Mevcut Değil"}
        </Typography>
      </Card>
    </Grid>
  );

  return (
    <Card
      elevation={5}
      sx={{
        display: "flex",
        alignItems: "center",
        borderRadius: "1rem",
        overflow: "hidden",
        backgroundColor: "background.main",
        transition: "all 0.5s ease-in-out",
        padding: "2.5rem",
        position: "relative",
        marginTop: "1.5rem",
      }}
    >
      {loading && (
        <CircularProgress
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      )}

      {profileData && (
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Avatar
            alt={`${profileData.firstName} ${profileData.lastName}`}
            src={profileData.imgFilePath}
            sx={{
              marginTop: 1,
              width: 150,
              height: 150,
              border: "3px solid #fff",
            }}
          >
            <PersonIcon sx={{ fontSize: 60 }} />
          </Avatar>

          <Typography
            variant="h2"
            sx={{
              mt: 2,
              color: "text.primary",
              fontFamily: "Century Gothic, Roboto",
              fontSize: "1.3rem",
              fontWeight: "bold",
              textAlign: "center",
              fontStyle: "italic",
            }}
          >
            Merhaba,
          </Typography>
          <Typography
            variant="h2"
            sx={{
              color: "text.primary",
              fontFamily: "Century Gothic, Roboto",
              fontSize: "1.6rem",
              marginTop: "0.2rem",
              marginBottom: "0.4rem",
              textAlign: "center",
            }}
          >
            {`${profileData.firstName || "Ad"} ${profileData.lastName || "Soyad"}`}
          </Typography>
          {!isAdmin && !isOwner && (
          <Typography
            variant="h3"
            sx={{
              color: "text.primary",
              fontFamily: "Century Gothic, Roboto",
              marginTop: "0",
              fontStyle: "italic",
              fontSize: "1rem",
            }}
          >
            {`${profileData.professionName || "Departman"} / ${profileData.departmentName || "Meslek"}`}
          </Typography>
          )}

{isAdmin && (
          <Typography
            variant="h3"
            sx={{
              color: "text.primary",
              textAlign: "center",
              fontFamily: "Century Gothic, Roboto",
              marginTop: "0px",
              fontStyle: "italic",
              fontSize: "1rem",
            }}
          >
            {`Şirket Yöneticisi`}
          </Typography>
          )}

{isOwner && (
          <Typography
            variant="h3"
            sx={{
              color: "text.primary",
              textAlign: "center",
              fontFamily: "Century Gothic, Roboto",
              marginTop: "0px",
              fontStyle: "italic",
              fontSize: "1rem",
            }}
          >
            {`Site Yöneticisi`}
          </Typography>
          )}

          {!isAdmin && (
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={() => navigate("/profileChange")}
              sx={{
                marginTop: 2,
                color: "text.primary",
                backgroundColor: "card.backgroundMain",
                borderRadius: 4,
                transition: "all 0.5s ease-in-out",
              }}
            >
              Profili Düzenle
            </Button>
          )}

        </Box>
      )}

      {profileData && (
        <Grid
          container
          spacing={1}
          sx={{ p:2 , mt: 1, fontFamily: "Century Gothic, Roboto", transition: "all 0.5s ease-in-out" , textAlign: "center"}}
        >
          {isAdmin && renderInfoItem("E-posta", profileData.email, <EmailIcon />)}
          {!isAdmin && renderInfoItem("Adres", profileData.address, <HomeIcon />)}
          {!isAdmin && renderInfoItem("Şehir", profileData.city, <LocationCityIcon />)}
          {!isAdmin && renderInfoItem("İlçe", profileData.county, <RoomIcon />)}
          {isAdmin && renderInfoItem("Admin olarak giriş yaptınız." , "Şirketinizin tüm kullanıcılarını görüntüleyebilir ve çalışanlarınızın taleplerini yönetebilirsiniz.", <InfoOutlined />)}
          {isOwner && renderInfoItem("Site yöneticisi olarak giriş yaptınız." , "Tüm şirketleri görebilir, düzenleyebilir ve aboneliklerini yönetebilirsiniz.", <InfoOutlined />)}
        </Grid>
      )}
    </Card>
  );
};

export default HomeSummaryCard;
