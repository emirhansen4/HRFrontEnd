import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  Grid,
  InputAdornment,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  CircularProgress,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import {
  PermIdentity as PermIdentityIcon,
  DateRange as DateRangeIcon,
  LocationOn as LocationOnIcon,
  AlternateEmail as AlternateEmailIcon,
  Phone as PhoneIcon,
  Save as SaveIcon,
} from "@mui/icons-material";
import { styled } from "@mui/system";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { location } from "../../../Services/apis/locationService";
import { addEmployee, getJobs } from "../../../Services/apis/employeeService";
import { ProfilePictureCard } from "./profilePictureCard/ProfilePictureCard";

const StyledCard = styled(Paper)({
  padding: "24px",
  borderRadius: "16px",
  transition: "all 0.5s ease-in-out",
  height: "100%",
  width: "100%",
  maxWidth: "800px",
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

const StyledTextField = styled(TextField)({
  marginBottom: "16px",
  width: "100%",
  transition: "all 0.5s ease-in-out",
  "& .MuiInputBase-root": {
    background: "transperent",
    borderRadius: "8px",
    fontSize: "1rem",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
  },
  "& .MuiInputLabel-root": {
    fontSize: "1rem",
  },
  "& .MuiInputBase-root.Mui-focused": {
    background: "transperent",
  },
  "& .MuiInput-underline:after": {
    fontSize: "2rem",
  },
});

const StyledButton = styled(Button)({
  borderRadius: "4  px",
  fontSize: "14px",
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

const AddPersonal = () => {
  const [generateEmail, setGenerateEmail] = useState(true);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [cities, setCities] = useState([]);
  const [counties, setCounties] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [positions, setPositions] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useDispatch();
  const locations = useSelector((select) => select.locations);
  const jobs = useSelector((select) => select.jobs);

  const [personalData, setPersonalData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    secondLastName: "",
    birthDate: "",
    placeOfBirth: "",
    trIdentityNumber: "",
    city: "",
    county: "",
    address: "",
    phone: "",
    salary: "",
    startDate: "",
    Department: "",
    Profession: "",
    profilePicture: "",
    email: "",
  });

  const showError = (message) => {
    toast.error(message);
    return false;
  };
  
  const validateNotEmpty = (field, fieldName, minLength, maxLength) => {
    const trimmedField = field ? field.trim() : '';
    if (!trimmedField || trimmedField.length < minLength || trimmedField.length > maxLength) {
      showError(`${fieldName} alanı ${minLength}-${maxLength} karakter arasında olmalıdır ve boş bırakılamaz`);
      return false;
    }
    return true;
  };
  
  const validateAlphaOnly = (field, fieldName, minLength, maxLength) => {
    const trimmedField = field ? field.trim() : '';
    if (!/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/.test(trimmedField)) {
      showError(`${fieldName} alanı sadece harf içermelidir ve boş bırakılamaz`);
      return false;
    }
    return validateNotEmpty(trimmedField, fieldName, minLength, maxLength);
  };
  
  const validateNumberOnly = (field, fieldName, minLength, maxLength) => {
    const trimmedField = field ? field.trim() : '';
    if (!/^\d+$/.test(trimmedField)) {
      showError(`${fieldName} alanı sadece rakam içermelidir ve boş bırakılamaz`);
      return false;
    }
    return validateNotEmpty(trimmedField, fieldName, minLength, maxLength);
  };
  
  const validateEmail = (email) => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      showError("Geçerli bir email adresi giriniz");
      return false;
    }
    return true;
  };
  
  const validatePhoneNumber = (phoneNumber) => {
    if (!/^05\d{9}$/.test(phoneNumber.trim())) {
      showError("Telefon numarası 05 ile başlamalı ve 11 haneli olmalıdır.");
      return false;
    }
    return true;
  };
  
  const validateSalary = (salary) => {
    const trimmedSalary = salary ? salary.trim() : '';
    if (!/^\d+$/.test(trimmedSalary)) {
      showError("Geçerli bir maaş giriniz");
      return false;
    }
    if (parseInt(trimmedSalary) <= 17000) {
      showError("Maaş Asgari Ücretten (17.000TL) büyük olmalıdır");
      return false;
    }
    return true;
  };
  
  const validateDate = (date) => {
    if (isNaN(Date.parse(date.trim()))) {
      showError("Geçerli bir tarih giriniz");
      return false;
    }
    return true;
  };
  
  const validateFields = () => {
    if (activeStep === 1) {
      return (
        validateAlphaOnly(personalData.firstName, "Ad", 2, 50) &&
        validateAlphaOnly(personalData.lastName, "Soyad", 2, 50) &&
        validateEmail(personalData.email)
      );
    }
  
    if (activeStep === 2) {
      return (
        validateAlphaOnly(personalData.city, "Şehir", 2, 50) &&
        validateAlphaOnly(personalData.county, "İlçe", 2, 50) &&
        validateNotEmpty(personalData.address, "Adres", 20, 200) &&
        validatePhoneNumber(personalData.phone)
      );
    }
  
    if (activeStep === 3) {
      return (
        validateSalary(personalData.salary) &&
        validateDate(personalData.startDate)
      );
    }
  
    if (activeStep === 4) {
      return (
        validateDate(personalData.birthDate) &&
        validateAlphaOnly(personalData.placeOfBirth, "Doğum Yeri", 2, 100) &&
        validateNotEmpty(personalData.trIdentityNumber, "TC Kimlik Numarası", 11, 11)
      );
    }
  
    return true;
  };


  const handleProfilePictureUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPersonalData((prevData) => ({
        ...prevData,
        profilePicture: file,
      }));
      setImageUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (locations.data.length === 0) dispatch(location());
    if (jobs.data.length === 0) dispatch(getJobs());
  }, []);

  useEffect(() => {
    if (jobs.data.length !== 0) {
      setPositions(jobs.data.professions);
      setDepartments(jobs.data.departments);
    }
  }, [jobs.data]);

  useEffect(() => {
    setCities(locations.data.map((item) => item.name));
  }, [locations.data]);

  useEffect(() => {
    if (personalData.city) {
      setPersonalData((prev) => ({ ...prev, county: "" }));
      setCounties(
        locations.data
          .filter((item) => item.name === personalData.city)[0]
          .districts.map((item) => item.name)
      );
    }
  }, [personalData.city, locations]);

  useEffect(() => {
    if (generateEmail) {
      const generatedEmail = `${personalData.firstName.toLowerCase()}.${personalData.lastName.toLowerCase()}@şirketadı.com`;
      setPersonalData((prevData) => ({ ...prevData, email: generatedEmail }));
    } else {
      setPersonalData((prevData) => ({ ...prevData, email: "" }));
    }
  }, [generateEmail, personalData.firstName, personalData.lastName]);

  const handleInputChange = (name) => (event) => {
    setPersonalData({ ...personalData, [name]: event.target.value });
  };

  const handleSave = () => {
    if (validateFields()) {
    setLoading(true);

    const formData = new FormData();
    formData.append("firstName", personalData.firstName);
    formData.append("middleName", personalData.middleName);
    formData.append("lastName", personalData.lastName);
    formData.append("secondLastName", personalData.secondLastName);
    formData.append("birthDate", personalData.birthDate);
    formData.append("placeOfBirth", personalData.placeOfBirth);
    formData.append("trIdentityNumber", personalData.trIdentityNumber);
    formData.append("city", personalData.city);
    formData.append("county", personalData.county);
    formData.append("address", personalData.address);
    formData.append("phone", personalData.phone);
    formData.append("salary", personalData.salary);
    formData.append("startDate", personalData.startDate);
    formData.append("Department", personalData.Department);
    formData.append("Profession", personalData.Profession);
    formData.append("profilePicture", personalData.profilePicture);

    addEmployee(formData, (message, error) => {
      setLoading(false);
      if (message) {
        toast.success(message);
      } else if (error) {
        toast.error("İlgili hata oluştu:" + error);
      } else {
        toast.warning("Bir hata alındı. Lütfen tekrar deneyiniz");
      }
    });
    }
  };

  const handleNext = () => {
    if (validateFields()) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };


  return (
    <Box sx={{ padding: 4 }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        <Step key="ProfilePicture">
          <StepLabel>Profil Resmi Ekle</StepLabel>
        </Step>
        <Step key="ContactInfo">
          <StepLabel>İletişim Bilgilerini Ekle</StepLabel>
        </Step>
        <Step key="PersonalInfo">
          <StepLabel>Kişisel Bilgileri Ekle</StepLabel>
        </Step>
        <Step key="JobInfo">
          <StepLabel>İş Bilgilerini Ekle</StepLabel>
        </Step>
        <Step key="BirthInfo">
          <StepLabel>Doğum Bilgilerini Ekle</StepLabel>
        </Step>
      </Stepper>
      <Grid container spacing={5} justifyContent="center">
        {activeStep === 0 && (
          <Grid item xs={12} mt={5} marginBottom={"10px"}>
            <ProfilePictureCard
              pictureURL={imageUrl}
              handleProfilePictureUpload={handleProfilePictureUpload}
            />
          </Grid>
        )}

        <Grid
          item
          xs={12}
          md={8}
          style={{ marginBottom: "12px", marginTop: "0px" }}
        >
          {activeStep === 0 && <Grid container spacing={2}></Grid>}

          {activeStep === 1 && (
            <Grid
              container
              spacing={1}
              style={{ marginTop: "30px", marginBottom: "20px" }}
            >
              <StyledCard
                elevation={5}
                style={{
                  borderRadius: "8px",
                  background: "card.backgroundSecondary",
                  minHeight: "400px",
                }}
              >
                <Typography variant="h4" sx={{ marginTop: 3, marginBottom: 3 }}>
                  Kişisel Bilgiler
                </Typography>
                <StyledTextField
                  label="Ad"
                  fullWidth
                  value={personalData.firstName}
                  onChange={handleInputChange("firstName")}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PermIdentityIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <StyledTextField
                  label="İkinci Ad"
                  fullWidth
                  value={personalData.middleName}
                  onChange={handleInputChange("middleName")}
                />
                <StyledTextField
                  label="Soyad"
                  fullWidth
                  value={personalData.lastName}
                  onChange={handleInputChange("lastName")}
                />
                <StyledTextField
                  label="İkinci Soyad"
                  fullWidth
                  value={personalData.secondLastName}
                  onChange={handleInputChange("secondLastName")}
                />
                
                <StyledTextField
                  label="Email"
                  fullWidth
                  value={personalData.email}
                  onChange={handleInputChange("email")}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AlternateEmailIcon />
                      </InputAdornment>
                    ),
                  }}
                  disabled={generateEmail}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={generateEmail}
                      onChange={() => setGenerateEmail(!generateEmail)}
                    />
                  }
                  label="Email'i otomatik oluştur"
                />
              </StyledCard>
              
            </Grid>
          )}

          {activeStep === 2 && (
            <Grid
              container
              spacing={1}
              style={{ marginTop: "30px", marginBottom: "20px" }}
            >
              <StyledCard
                elevation={5}
                style={{
                  borderRadius: "8px",
                  background: "card.backgroundSecondary",
                  minHeight: "400px",
                }}
              >
                <Typography variant="h4" sx={{ marginTop: 3, marginBottom: 3 }}>
                  İletişim Bilgileri
                </Typography>
                <FormControl
                  fullWidth
                  variant="outlined"
                  sx={{ marginBottom: "15px" }}
                >
                  <InputLabel htmlFor="city">Şehir</InputLabel>
                  <Select
                    id="city"
                    label="Şehir"
                    name="city"
                    value={personalData.city}
                    sx={{ borderRadius: "8px" }}
                    onChange={handleInputChange("city")}
                  >
                    {cities.map((city) => (
                      <MenuItem key={city} value={city}>
                        {city}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl
                  fullWidth
                  variant="outlined"
                  sx={{ marginBottom: "15px" }}
                  disabled={!personalData.city}
                >
                  <InputLabel htmlFor="county">İlçe</InputLabel>
                  <Select
                    id="county"
                    label="İlçe"
                    name="county"
                    value={personalData.county}
                    sx={{ borderRadius: "8px" }}
                    onChange={handleInputChange("county")}
                  >
                    {counties.map((county) => (
                      <MenuItem key={county} value={county}>
                        {county}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <StyledTextField
                  label="Adres"
                  fullWidth
                  value={personalData.address}
                  onChange={handleInputChange("address")}
                />
                <StyledTextField
                  label="Telefon"
                  fullWidth
                  value={personalData.phone}
                  onChange={handleInputChange("phone")}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </StyledCard>
            </Grid>
          )}

          {activeStep === 3 && (
            <Grid
              container
              spacing={1}
              style={{ marginTop: "30px", marginBottom: "20px" }}
            >
              <StyledCard
                elevation={5}
                style={{
                  borderRadius: "8px",
                  background: "card.backgroundSecondary",
                  minHeight: "400px",
                }}
              >
                <Typography variant="h4" sx={{ marginTop: 3, marginBottom: 3 }}>
                  İş Bilgileri
                </Typography>
                <FormControl
                  fullWidth
                  variant="outlined"
                  sx={{ marginBottom: "15px" }}
                >
                  <InputLabel htmlFor="Department">Departman</InputLabel>
                  <Select
                    id="Department"
                    label="Departman"
                    name="Department"
                    value={personalData.Department}
                    sx={{ borderRadius: "8px" }}
                    onChange={handleInputChange("Department")}
                  >
                    {departments.map((Department) => (
                       <MenuItem key={Department} value={Department}>
                       {Department}
                     </MenuItem>
                   ))}
                 </Select>
               </FormControl>
               <FormControl
                 fullWidth
                 variant="outlined"
                 sx={{ marginBottom: "15px" }}
                 disabled={!personalData.Department}
               >
                 <InputLabel htmlFor="Profession">Pozisyon</InputLabel>
                 <Select
                   id="Profession"
                   label="Pozisyon"
                   name="Profession"
                   value={personalData.Profession}
                   sx={{ borderRadius: "8px" }}
                   onChange={handleInputChange("Profession")}
                 >
                   {positions.map((Profession) => (
                     <MenuItem key={Profession} value={Profession}>
                       {Profession}
                     </MenuItem>
                   ))}
                 </Select>
               </FormControl>
               <StyledTextField
                 label="Maaş"
                 fullWidth
                 value={personalData.salary}
                 onChange={handleInputChange("salary")}
               />
               <StyledTextField
                 label="Başlangıç Tarihi"
                 type="date"
                 fullWidth
                 value={personalData.startDate}
                 onChange={handleInputChange("startDate")}
                 InputLabelProps={{
                   shrink: true,
                 }}
               />
             </StyledCard>
           </Grid>
         )}

         {activeStep === 4 && (
           <Grid
             container
             spacing={1}
             style={{ marginTop: "30px", marginBottom: "20px" }}
           >
             <StyledCard
               elevation={5}
               style={{
                 borderRadius: "8px",
                 background: "card.backgroundSecondary",
                 minHeight: "400px",
               }}
             >
               <Typography variant="h4" sx={{ marginTop: 3, marginBottom: 3 }}>
                 Doğum Bilgileri
               </Typography>
               <StyledTextField
                 label="Doğum Tarihi"
                 type="date"
                 fullWidth
                 value={personalData.birthDate}
                 onChange={handleInputChange("birthDate")}
                 InputLabelProps={{
                   shrink: true,
                 }}
               />
               <StyledTextField
                 label="Doğum Yeri"
                 fullWidth
                 value={personalData.placeOfBirth}
                 onChange={handleInputChange("placeOfBirth")}
               />
               <StyledTextField
                 label="TC Kimlik Numarası"
                 fullWidth
                 value={personalData.trIdentityNumber}
                 onChange={handleInputChange("trIdentityNumber")}
               />
             </StyledCard>
           </Grid>
         )}
       </Grid>
       <Grid item xs={12} textAlign="center">
         <StyledButton
           variant="contained"
           color="primary"
           onClick={activeStep === 4 ? handleSave : handleNext}
         >
           {activeStep === 4 ? "Kaydet" : "İleri"}
         </StyledButton>
         {activeStep !== 0 && (
           <StyledButton
             variant="outlined"
             color="secondary"
             onClick={handleBack}
             sx={{ marginTop: "10px", borderRadius: "8px", boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)" }}
           >
             Geri
           </StyledButton>
         )}
         {loading && <CircularProgress size={24} sx={{ ml: 1 }} />}
       </Grid>
     </Grid>
   </Box>
 );
};

export default AddPersonal;