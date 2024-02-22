import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import {
  Input,
  IconButton,
  Stack,
  Skeleton,
  Alert,
  CircularProgress,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import {
  getProfileUpdateDetails,
  updateProfile,
} from "../../../Services/apis/profileService";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import HomeIcon from "@mui/icons-material/Home";
import { location } from "../../../Services/apis/locationService";
import { toast } from "react-toastify";

const ProfileUpdate = () => {
  const [cities, setCities] = useState([]);
  const [counties, setConties] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [userData, setUserData] = useState({
    imgFile: "",
    phoneNumber: "",
    address: "",
    city: "",
    county: "",
  });
  const dispatch = useDispatch();
  const locations = useSelector((state) => state.locations);
  const profileUpdateDetail = useSelector((state) => state.profileUpdateDetail);

  useEffect(() => {
    if (locations.data.length === 0) dispatch(location());
      dispatch(getProfileUpdateDetails());
  }, []);

  useEffect(() => {
    if (locations.data && !locations.loading) {
      setCities(locations.data.map((item) => item.name));
    }
  }, [locations.data]);

  useEffect(() => {
    if (userData.city != "" && locations.data.length !==0) {
      setConties(
        locations.data
          .filter((item) => item.name == userData.city)[0]
          .districts.map((item) => item.name)
      );
    }
  }, [userData.city, locations.data]);

  useEffect(() => {
    if (profileUpdateDetail.data) {
      setUserData({
        imgFile: "",
        address: profileUpdateDetail.data.address || "",
        city: profileUpdateDetail.data.city || "",
        county: profileUpdateDetail.data.county || "",
        phoneNumber: profileUpdateDetail.data.phoneNumber || "",
      });
      setImageUrl(profileUpdateDetail.data.filePath || "");
    }
  }, [profileUpdateDetail.data, locations]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUserData((prevData) => ({
        ...prevData,
        imgFile: file,
      }));
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name == "city") setUserData((prev) => ({ ...prev, county: "" }));
  };

  const handleUpdateProfile = (event) => {
    event.preventDefault();

    const formErrors = {};
    if (!imageUrl) {
      formErrors.imgFileName = "Lütfen bir profil resmi seçin.";
    }
    if (!userData.phoneNumber) {
      formErrors.phoneNumber = "Lütfen bir telefon numarası girin.";
    } else if (!/^05[0-9]{9}$/.test(userData.phoneNumber)) {
      formErrors.phoneNumber = "Lütfen geçerli bir telefon numarası girin.";
    }
    if (!userData.address) {
      formErrors.address = "Lütfen bir adres girin.";
    }
    if (!userData.city) {
      formErrors.city = "Lütfen bir şehir seçin.";
    }
    if (!userData.county) {
      formErrors.county = "Lütfen bir ilçe seçin.";
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setErrorAlert(true);
      setTimeout(() => {
        setErrorAlert(false);
      }, 3000);
      return;
    }
    const formData = new FormData();
    formData.append("ImgFile", userData.imgFile);
    formData.append("PhoneNumber", userData.phoneNumber);
    formData.append("Address", userData.address);
    formData.append("City", userData.city);
    formData.append("County", userData.county);
    setUpdateLoading(true);
    updateProfile(formData, (message, error) => {
      if (message) {
        toast.success("Başarılı bir şekilde güncellenmiştir.");
        dispatch(getProfileUpdateDetails());
      } else if (error) {
        toast.error("Lütfen girilen değerleri kontrol ediniz");
      } else {
        toast.warning("Bir hata oluştu. Lütfen tekrar deneyiniz");
      }
      setUpdateLoading(false);
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Container component="main">
      <CssBaseline />
      <Card
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 4,
        }}
      >
        <Typography component="h1" variant="h5" sx={{ marginBottom: "15px" }}>
          Profili Düzenle
        </Typography>
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="center"
          spacing={2}
        >
          {loading ? (
            <Skeleton variant="circular" width={100} height={100} />
          ) : (
            <Avatar
              src={imageUrl}
              alt="Profile Avatar"
              sx={{ bgcolor: "secondary.main", width: 100, height: 100 }}
            />
          )}
          <label htmlFor="imgFileName">
            <Input
              accept="image/*"
              style={{ display: "none" }}
              id="imgFileName"
              name="imgFileName"
              type="file"
              onChange={handleImageChange}
            />
            <IconButton component="span">
              <EditIcon />
            </IconButton>
          </label>
        </Stack>
        {errors.imgFileName && (
          <Alert
            severity="error"
            onClose={() =>
              setErrors((prevErrors) => ({ ...prevErrors, imgFileName: "" }))
            }
            sx={{ mt: 2 }}
          >
            {errors.imgFileName}
          </Alert>
        )}
        <form onSubmit={handleUpdateProfile} style={{ width: "100%" }}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                fullWidth
                id="phoneNumber"
                label="Telefon Numarası"
                name="phoneNumber"
                value={userData.phoneNumber}
                onChange={handleChange}
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal" error={!!errors.city}>
                <InputLabel htmlFor="city">Şehir</InputLabel>
                <Select
                  id="city"
                  label="Şehir"
                  name="city"
                  value={userData.city}
                  onChange={handleChange}
                >
                  {cities.map((city) => (
                    <MenuItem key={city} value={city}>
                      {city}
                    </MenuItem>
                  ))}
                </Select>
                {errors.city && (
                  <Typography variant="caption" color="error">
                    {errors.city}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal" error={!!errors.county}>
                <InputLabel htmlFor="county">İlçe</InputLabel>
                <Select
                  id="county"
                  label="İlçe"
                  name="county"
                  value={userData.county}
                  onChange={handleChange}
                >
                  {counties.map((county) => (
                    <MenuItem key={county} value={county}>
                      {county}
                    </MenuItem>
                  ))}
                </Select>
                {errors.county && (
                  <Typography variant="caption" color="error">
                    {errors.county}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                fullWidth
                id="address"
                label="Adres"
                name="address"
                value={userData.address}
                onChange={handleChange}
                error={!!errors.address}
                helperText={errors.address}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: "primary.main",
              color: "white",
            }}
            disabled={updateLoading}
          >
            Profili Güncelle
            {updateLoading ? (
              <CircularProgress
                size={24}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: "-12px",
                  marginLeft: "-12px",
                }}
                variant="indeterminate"
              />
            ) : (
              ""
            )}
          </Button>
        </form>
      </Card>
    </Container>
  );
};

export default ProfileUpdate;
