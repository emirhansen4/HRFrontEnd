import BusinessIcon from "@mui/icons-material/Business";
import DeleteIcon from "@mui/icons-material/Delete";
import DescriptionIcon from "@mui/icons-material/Description";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import SaveIcon from "@mui/icons-material/Save";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  IconButton,
  Paper,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { companiesGet, companyAdd } from "../../../../Services/apis/companyService";
import { warning } from "framer-motion";
import { useDispatch } from "react-redux";

const AddCompany = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const dispatch = useDispatch()
  const [companyDataErrors, setCompanyDataErrors] = useState({
    name: "",
    description: "",
    subscriptionStart: "",
    subscriptionEnd: "",
    adress: "",
    phone: "",
  });
  const [adminDataErrors, setAdminDataErrors] = useState({
    password: "",
    TC: "",
    birthDate: "",
  });
  const [companyData, setCompanyData] = useState({
    logo: null,
    name: "",
    description: "",
    subscriptionStart: "",
    subscriptionEnd: "",
    adress: "",
    phone: "",
  });
  const [adminData, setAdminData] = useState({
    name: "",
    secondName: "",
    lastName: "",
    secondLastName: "",
    email: "",
    password: "",
    TC: "",
    birthDate: "",
    placeOfBirth: "",
  });

  // const subscriptionPackages = {
  //   basic: {
  //     name: "Tall - 90 Gün - 1000 TL",
  //     features: ["Standart TeamPulse Özellikleri"],
  //     days: 90,
  //   },
  //   standard: {
  //     name: "Grande - 180 Gün - 1500 TL",
  //     features: ["Orta Ölçekli Destek"],
  //     days: 120,
  //   },
  //   premium: {
  //     name: "Venti - 360 Gün - 2000 TL",
  //     features: ["Yüksek Öncelikli Destek"],
  //     days: 180,
  //   },
  // };
  useEffect(() => {
    // Calculate subscriptionLeft when subscriptionStart or subscriptionEnd changes
    if (companyData.subscriptionStart && companyData.subscriptionEnd) {
      const start = new Date(companyData.subscriptionStart);
      const end = new Date(companyData.subscriptionEnd);
      const diffInMs = end - start;
      const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
      setCompanyData({
        ...companyData,
        subscriptionLeft: Math.round(diffInDays),
      });
    }
  }, [companyData.subscriptionStart, companyData.subscriptionEnd]);

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
      case "adress":
        if (event.target.value.length < 20) {
          setCompanyDataErrors({
            ...companyDataErrors,
            adress: "Adres karakter uzunluğu 20'den fazla olmalıdır.",
          });
        } else {
          setCompanyDataErrors({ ...companyDataErrors, [name]: "" });
        }
        break;
      case "subscriptionStart" :
        if (event.target.value > companyData.subscriptionEnd) {
          setCompanyDataErrors({
            ...companyDataErrors,
            subscriptionEnd: "Başlangıç tarihi bitiş tarihinden ileride olamaz.",
          });
        } else {
          setCompanyDataErrors({ ...companyDataErrors, subscriptionEnd: "" });
        }
        break;
      case "subscriptionEnd" :
        if (event.target.value < companyData.subscriptionStart) {
          setCompanyDataErrors({
            ...companyDataErrors,
            subscriptionEnd: "Başlangıç tarihi bitiş tarihinden ileride olamaz.",
          });
        } else {
          setCompanyDataErrors({ ...companyDataErrors, subscriptionEnd: "" });
        }
        break;
    }
  };

  const handleAdminInputChange = (name) => (event) => {
    setAdminData({ ...adminData, [name]: event.target.value });
    switch (name) {
      case "password":
        if (
          !/[a-z]/.test(event.target.value) ||
          !/[A-Z]/.test(event.target.value) ||
          !/\d/.test(event.target.value) ||
          !/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(event.target.value) ||
          event.target.value.length < 10
        ) {
          setAdminDataErrors({
            ...adminDataErrors,
            password:
              "En az 10 kerekter sayı büyük küçük harf ve sembol içermelidir.",
          });
        } else {
          setAdminDataErrors({ ...adminDataErrors, [name]: "" });
        }
        break;
      case "TC":
        if (
          event.target.value.length !== 11 ||
          !/\d/.test(event.target.value)
        ) {
          setAdminDataErrors({
            ...adminDataErrors,
            TC: "email boş bırakılamaz",
          });
        } else {
          setAdminDataErrors({ ...adminDataErrors, [name]: "" });
        }
        break;
      case "birthDate":
        const bDate = new Date(event.target.value);
        const today = new Date();
        today.setFullYear(today.getFullYear() - 18);
        if (bDate > today) {
          setAdminDataErrors({
            ...adminDataErrors,
            birthDate: "18 yaşından büyük olmalı.",
          });
        } else {
          setAdminDataErrors({ ...adminDataErrors, [name]: "" });
        }
        break;
    }
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

  const handleRemoveLogo = () => {
    setCompanyData({ ...companyData, logo: null });
    setImageUrl("");
  };

  const handleSave = () => {
    if (
      !Object.values(companyDataErrors).every((value) => !value)
    ) {
      toast.error("Lütfen girdiğiniz bilgileri kontrol ediniz.");
      return 0;
    }
    setLoading(true);
    companyAdd(adminData, companyData, (message, error)=>{
      if(message){
        toast.success("Şirket ekleme işlemi başarıyla tamamlandı.")
        dispatch(companiesGet())
      }else{
        toast.warning("Bir hata oluştu. Lütfen tekrar deneyiniz.")
      }
      setLoading(false);
    })
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        <Step key="Logo">
          <StepLabel icon={<PhotoCameraIcon />}>Şirket Logosu</StepLabel>
        </Step>
        <Step key="CompanyInfo">
          <StepLabel icon={<BusinessIcon />}>Şirket Bilgileri</StepLabel>
        </Step>
        <Step key="AdminInfo">
          <StepLabel icon={<SupervisorAccountIcon />}>
            Admin Hesabı Bilgileri
          </StepLabel>
        </Step>
      </Stepper>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 4,
        }}
      >
        {activeStep === 0 && (
          <>
            <Paper
              component="form"
              sx={{
                padding: 4,
                width: "500px",
                height: "350px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                borderRadius: "12px",
                transition: "all 0.5s ease-in-out",
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
                Şirket Logosu Yükle
              </Typography>
              <Avatar alt="Company Logo" sx={{ width: 150, height: 150 }}>
                {companyData.logo ? (
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
                <Button
                  variant="outlined"
                  component="span"
                  sx={{ marginTop: 2 }}
                >
                  Şirket Logosu Seç
                </Button>
              </label>
            </Paper>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "200px",
                marginTop: 2,
                gap: 1,
              }}
            >
              <Button
                variant="contained"
                onClick={() => setActiveStep(1)}
                disabled={!imageUrl}
              >
                İleri
              </Button>
            </Box>
          </>
        )}
        {activeStep === 1 && (
          <>
            <Card
              sx={{
                width: "800px",
                minHeight: "350px",
                marginBottom: 2,
                borderRadius: "12px",
                transition: "all 0.3s ease-in-out",
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ marginBottom: 4 }}>
                  Yeni Şirket Ekle
                </Typography>
                <Grid container spacing={1}>
                  <Grid item xs={12} md={6} xl={6}>
                    <TextField
                      label="Şirket İsmi"
                      fullWidth
                      value={companyData.name}
                      onChange={handleInputChange("name")}
                      sx={{ marginBottom: 2 }}
                      variant="outlined"
                      InputProps={{ startAdornment: <BusinessIcon /> }}
                      error={companyDataErrors.name}
                      helperText={companyDataErrors.name}
                    />
                  </Grid>
                  <Grid item xs={12} md={3} xl={3}>
                    <TextField
                      label="Abonelik Başlangıcı"
                      type="date"
                      fullWidth
                      value={companyData.subscriptionStart}
                      onChange={handleInputChange("subscriptionStart")}
                      sx={{ marginBottom: 2 }}
                      variant="outlined"
                      InputProps={{ startAdornment: " " }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3} xl={3}>
                    <TextField
                      label="Abonelik Bitişi"
                      type="date"
                      fullWidth
                      value={companyData.subscriptionEnd}
                      onChange={handleInputChange("subscriptionEnd")}
                      sx={{ marginBottom: 2 }}
                      variant="outlined"
                      InputProps={{ startAdornment: " " }}
                      error={companyDataErrors.subscriptionEnd}
                      helperText={companyDataErrors.subscriptionEnd}
                    />
                  </Grid>
                  <Grid item xs={12} md={8} xl={8}>
                    <TextField
                      label="Şirket Detayı"
                      fullWidth
                      value={companyData.description}
                      onChange={handleInputChange("description")}
                      sx={{ marginBottom: 2 }}
                      variant="outlined"
                      InputProps={{ startAdornment: <DescriptionIcon /> }}
                      error={companyDataErrors.description}
                      helperText={companyDataErrors.description}
                    />
                  </Grid>
                  <Grid item xs={12} md={4} xl={4}>
                    <TextField
                      label="Telefon"
                      fullWidth
                      value={companyData.phone}
                      onChange={handleInputChange("phone")}
                      sx={{ marginBottom: 2 }}
                      variant="outlined"
                      InputProps={{ startAdornment: <LocalPhoneIcon /> }}
                      error={companyDataErrors.phone}
                      helperText={companyDataErrors.phone}
                    />
                  </Grid>
                  <Grid item xs={12} md={12} xl={12}>
                    <TextField
                      label="Adres"
                      fullWidth
                      value={companyData.adress}
                      onChange={handleInputChange("adress")}
                      sx={{ marginBottom: 2 }}
                      variant="outlined"
                      InputProps={{ startAdornment: <HomeWorkIcon /> }}
                      error={companyDataErrors.adress}
                      helperText={companyDataErrors.adress}
                    />
                  </Grid>
                  {/* <FormControl component="fieldset" sx={{ marginBottom: 2 }}>
                  <FormLabel component="legend">Paket Seçimi</FormLabel>
                  <RadioGroup
                    aria-label="package"
                    name="package"
                    value={companyData.selectedPackage}
                    onChange={handlePackageChange}
                    sx={{ flexDirection: "row" }}
                  >
                    {Object.keys(subscriptionPackages).map((pkg) => (
                      <Tooltip
                        key={pkg}
                        title={`${subscriptionPackages[pkg].features.join(
                          ", "
                        )}`}
                        arrow
                        placement="top"
                      >
                        <FormControlLabel
                          value={pkg}
                          control={<Radio />}
                          label={subscriptionPackages[pkg].name}
                          sx={{
                            width: "100%",
                            border: "2px solid #3f51b5",
                            borderRadius: "12px",
                            margin: "0.5rem",
                            padding: "1rem",
                            display: "flex",
                            alignItems: "center",
                            transition: "all 0.5s ease-in-out",
                            cursor: "pointer",
                            "&:hover": {
                              backgroundColor: "#3f51b5",
                              color: "#fff",
                            },
                          }}
                        />
                      </Tooltip>
                    ))}
                  </RadioGroup>
                </FormControl> */}
                </Grid>
              </CardContent>
            </Card>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "200px",
                gap: 1,
              }}
            >
              <Button
                variant="contained"
                onClick={() => setActiveStep(2)}
                disabled={
                  !companyData.name ||
                  !companyData.description ||
                  !companyData.adress ||
                  !companyData.phone ||
                  !companyData.subscriptionStart ||
                  !companyData.subscriptionEnd
                }
              >
                ileri
              </Button>
              <Button variant="outlined" onClick={() => setActiveStep(0)}>
                Geri
              </Button>
            </Box>
          </>
        )}
        {activeStep === 2 && (
          <>
            <Card
              sx={{
                width: "800px",
                minHeight: "350px",
                marginBottom: 2,
                borderRadius: "12px",
                transition: "all 0.3s ease-in-out",
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ marginBottom: 4 }}>
                  Admin Bilgileri
                </Typography>
                <Grid container spacing={1}>
                  <Grid item sm={12} md={3} xl={3}>
                    <TextField
                      label="Adı"
                      fullWidth
                      value={adminData.name}
                      onChange={handleAdminInputChange("name")}
                      sx={{ marginBottom: 2 }}
                    />
                  </Grid>
                  <Grid item sm={12} md={3} xl={3}>
                    <TextField
                      label="2. Adı"
                      fullWidth
                      value={adminData.secondName}
                      onChange={handleAdminInputChange("secondName")}
                      sx={{ marginBottom: 2 }}
                    />
                  </Grid>
                  <Grid item sm={12} md={3} xl={3}>
                    <TextField
                      label="Soyadı"
                      fullWidth
                      value={adminData.lastName}
                      onChange={handleAdminInputChange("lastName")}
                      sx={{ marginBottom: 2 }}
                    />
                  </Grid>
                  <Grid item sm={12} md={3} xl={3}>
                    <TextField
                      label="2.soyadı"
                      fullWidth
                      value={adminData.secondLastName}
                      onChange={handleAdminInputChange("secondLastName")}
                      sx={{ marginBottom: 2 }}
                    />
                  </Grid>
                  <Grid item sm={12} md={6} xl={6}>
                    <TextField
                      label="Admin Email"
                      type="email"
                      fullWidth
                      value={adminData.email}
                      onChange={handleAdminInputChange("email")}
                      sx={{ marginBottom: 2 }}
                    />
                  </Grid>
                  <Grid item sm={12} md={6} xl={6}>
                    <TextField
                      label="Şifre"
                      type="text"
                      fullWidth
                      value={adminData.password}
                      onChange={handleAdminInputChange("password")}
                      sx={{ marginBottom: 2 }}
                      error={adminDataErrors.password}
                      helperText={adminDataErrors.password}
                    />
                  </Grid>
                  <Grid item sm={12} md={4} xl={4}>
                    <TextField
                      label="TC no"
                      type="text"
                      fullWidth
                      value={adminData.TC}
                      onChange={handleAdminInputChange("TC")}
                      sx={{ marginBottom: 2 }}
                      error={adminDataErrors.TC}
                      helperText={adminDataErrors.TC}
                    />
                  </Grid>
                  <Grid item sm={12} md={4} xl={4}>
                    <TextField
                      label="Doğum Günü"
                      type="date"
                      fullWidth
                      value={adminData.birthDate}
                      onChange={handleAdminInputChange("birthDate")}
                      sx={{ marginBottom: 2 }}
                      InputProps={{ startAdornment: " " }}
                      error={adminDataErrors.birthDate}
                      helperText={adminDataErrors.birthDate}
                    />
                  </Grid>
                  <Grid item sm={12} md={4} xl={4}>
                    <TextField
                      label="Doğum Yeri"
                      type="text"
                      fullWidth
                      value={adminData.placeOfBirth}
                      onChange={handleAdminInputChange("placeOfBirth")}
                      sx={{ marginBottom: 2 }}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "200px",
                gap: 1,
              }}
            >
              <Button
                variant="contained"
                onClick={handleSave}
                startIcon={
                  loading ? <CircularProgress size={20} /> : <SaveIcon />
                }
                disabled={
                  loading ||
                  !adminData.name ||
                  !adminData.TC ||
                  !adminData.birthDate ||
                  !adminData.email ||
                  !adminData.lastName ||
                  !adminData.password ||
                  !adminData.placeOfBirth
                }
              >
                Kaydet
              </Button>
              <Button
                variant="outlined"
                onClick={() => setActiveStep(1)}
                disabled={loading}
              >
                Geri
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default AddCompany;
