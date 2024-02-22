import BusinessIcon from "@mui/icons-material/Business";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  companiesDetailGet, companiesGet, companyUpdate
} from "../../../../Services/apis/companyService";

const EditCompany = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [companyDataErrors, setCompanyDataErrors] = useState({
    name: "",
    description: "",
    subscriptionStart: "",
    subscriptionEnd: "",
    address: "",
    phone: "",
  });
  const [companyData, setCompanyData] = useState({
    logo: null,
    name: "",
    description: "",
    subscriptionStart: "",
    subscriptionEnd: "",
    address: "",
    phone: "",
  });
  const { id } = useParams();
  const dispatch = useDispatch();
  const companyDetail = useSelector((select) => select.companyDetail);

  useEffect(() => {
    if (id) dispatch(companiesDetailGet(id));
    
  }, []);
  useEffect(() => {
    if (companyDetail.data.length != 0) {
      setCompanyData({
        logo: null,
        name: companyDetail.data.companyName,
        address: companyDetail.data.address,
        description: companyDetail.data.description,
        phone: companyDetail.data.phoneNumber,
        subscriptionStart: companyDetail.data.subscriptionStart.split("T")[0],
        subscriptionEnd: companyDetail.data.subscriptionEnd.split("T")[0],
      });
      setImageUrl(companyDetail.data.logoPath);
    }
  }, [companyDetail.data]);

  const handleInputChange = (name) => (event) => {
    setCompanyData({ ...companyData, [name]: event.target.value });
    switch (name) {
      case "name":
        if (event.target.value.length < 3 || event.target.value.length > 20) {
          setCompanyDataErrors({
            ...companyDataErrors,
            name: "İsim karakter uzunluğu 3-20 arasında olmalıdır.",
          });
        } else {
          setCompanyDataErrors({ ...companyDataErrors, [name]: "" });
        }
        break;
      case "description":
        if (event.target.value.length < 10) {
          setCompanyDataErrors({
            ...companyDataErrors,
            description: "Detay karakter uzunluğu 10'den fazla olmalıdır.",
          });
        } else {
          setCompanyDataErrors({ ...companyDataErrors, [name]: "" });
        }
        break;
      case "phone":
        if (
          event.target.value.slice(0, 2) !== "05" ||
          event.target.value.length !== 11
        ) {
          setCompanyDataErrors({
            ...companyDataErrors,
            phone:
              "Telefon numarası 05 ile başlamalı ve toplam 11 sayıdan oluşmalı.",
          });
        } else {
          setCompanyDataErrors({ ...companyDataErrors, [name]: "" });
        }
        break;
      case "address":
        if (event.target.value.length < 20) {
          setCompanyDataErrors({
            ...companyDataErrors,
            address: "Adres karakter uzunluğu 20'den fazla olmalıdır.",
          });
        } else {
          setCompanyDataErrors({ ...companyDataErrors, [name]: "" });
        }
        break;
      case "subscriptionStart":
        if (event.target.value > companyData.subscriptionEnd) {
          setCompanyDataErrors({
            ...companyDataErrors,
            subscriptionEnd:
              "Başlangıç tarihi bitiş tarihinden ileride olamaz.",
          });
        } else {
          setCompanyDataErrors({ ...companyDataErrors, subscriptionEnd: "" });
        }
        break;
      case "subscriptionEnd":
        if (event.target.value < companyData.subscriptionStart) {
          setCompanyDataErrors({
            ...companyDataErrors,
            subscriptionEnd:
              "Başlangıç tarihi bitiş tarihinden ileride olamaz.",
          });
        } else {
          setCompanyDataErrors({ ...companyDataErrors, subscriptionEnd: "" });
        }
        break;
      default:
        break;
    }
  };

  const handleRemoveLogo = () => {
    setCompanyData({ ...companyData, logo: null });
    setImageUrl("");
  };

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
      const fileType = file.type;

      if (allowedFileTypes.includes(fileType)) {
        setCompanyData((prevData) => ({
          ...prevData,
          logo: file,
        }));
        setImageUrl(URL.createObjectURL(file));
      } else {
        toast.warning("Geçersiz dosya türü");
      }
    }
  };

  const handleSave = () => {
    if (!Object.values(companyDataErrors).every((value) => !value)) {
      toast.error("Lütfen girdiğiniz bilgileri kontrol ediniz.");
      return;
    }
    setLoading(true);
    companyUpdate(id, companyData, (message, error)=>{
      if(message){
        toast.success("Şirket başrıyla güncellenmiştir.");
        dispatch(companiesGet());
      }else if(error){
        toast.error("Lütfen girdiğiniz değerleri kontrole ediniz.")
      }else{
        toast.warning("Bir hata ile karşılaşıldı. Lütfen tekrar deneyiniz.")
      }
      setLoading(false);
    })  
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ padding: 4, textAlign: "center" }}>
        <Paper
          component="form"
          sx={{
            padding: 4,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "12px",
          }}
        >
          {companyData.logo ? (
            <Stack
              direction="row"
              spacing={1}
              sx={{ position: "absolute", top: 2, right: 2 }}
            >
              <IconButton onClick={handleRemoveLogo}>
                <DeleteIcon />
              </IconButton>
            </Stack>
          ) : null}
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Şirket Logosu Güncelle
          </Typography>
          <Avatar alt="Company Logo" sx={{ width: 150, height: 150, mb: 2 }}>
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Company Logo"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                }}
              />
            ) : (
              <BusinessIcon style={{ width: "40%", height: "auto" }} />
            )}
          </Avatar>
          <input
            type="file"
            accept="image/*"
            id="logo-upload"
            style={{ display: "none" }}
            onChange={handleLogoUpload}
          />
          <label htmlFor="logo-upload">
            <Button variant="outlined" component="span" sx={{ marginTop: 2 }}>
              Yeni Şirket Logosu Seç
            </Button>
          </label>
        </Paper>
        <Card
          sx={{
            width: "100%",
            mt: 4,
            borderRadius: "12px",
          }}
        >
          <CardContent>
            <Typography variant="h6" sx={{ marginBottom: 4 }}>
              Şirket Bilgilerini Düzenle
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Şirket İsmi"
                  variant="outlined"
                  fullWidth
                  value={companyData.name}
                  onChange={handleInputChange("name")}
                  error={!!companyDataErrors.name}
                  helperText={companyDataErrors.name}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  label="Başlangıç Tarihi"
                  variant="outlined"
                  fullWidth
                  type="date"
                  InputProps={{ startAdornment: " " }}
                  value={companyData.subscriptionStart}
                  onChange={handleInputChange("subscriptionStart")}
                  error={!!companyDataErrors.subscriptionStart}
                  helperText={companyDataErrors.subscriptionStart}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  label="Bitiş Tarihi"
                  variant="outlined"
                  fullWidth
                  type="date"
                  InputProps={{ startAdornment: " " }}
                  value={companyData.subscriptionEnd}
                  onChange={handleInputChange("subscriptionEnd")}
                  error={!!companyDataErrors.subscriptionEnd}
                  helperText={companyDataErrors.subscriptionEnd}
                />
              </Grid>
              <Grid item xs={12} md={8}>
                <TextField
                  label="Açıklama"
                  variant="outlined"
                  fullWidth
                  rows={2}
                  value={companyData.description}
                  onChange={handleInputChange("description")}
                  error={!!companyDataErrors.description}
                  helperText={companyDataErrors.description}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Telefon Numarası"
                  variant="outlined"
                  fullWidth
                  value={companyData.phone}
                  onChange={handleInputChange("phone")}
                  error={!!companyDataErrors.phone}
                  helperText={companyDataErrors.phone}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  label="Adres"
                  variant="outlined"
                  fullWidth
                  value={companyData.address}
                  onChange={handleInputChange("address")}
                  error={!!companyDataErrors.address}
                  helperText={companyDataErrors.address}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 2,
            mt: 2,
          }}
        >
          <Button
            variant="contained"
            onClick={handleSave}
            startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
            sx={{ width: "150px", alignSelf: "center" }}
            disabled={
              loading ||
              !imageUrl ||
              !companyData.name ||
              !companyData.description ||
              !companyData.subscriptionStart ||
              !companyData.subscriptionEnd ||
              !companyData.address ||
              !companyData.phone
            }
          >
            Kaydet
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default EditCompany;
