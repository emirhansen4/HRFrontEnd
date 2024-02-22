import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import {
  Alert,
  AlertTitle,
  CircularProgress,
  IconButton,
  Input,
  Snackbar,
  Tooltip,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  editEmployee,
  getEmployeeUpdateDetail,
} from "../../../Services/apis/employeeService";
import { location } from "../../../Services/apis/locationService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AlertMessage(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const PersonalEdit = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [cities, setCities] = useState([]);
  const [counties, setCounties] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [showProfilePictureAlert, setShowProfilePictureAlert] = useState(false);
  const [showRequiredFieldsAlert, setShowRequiredFieldsAlert] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const locations = useSelector((select) => select.locations);
  const employeeUpdateDetail = useSelector(
    (state) => state.employeeUpdateDetail
  );

  const [formData, setFormData] = useState({
    imgFile: "",
    address: "",
    city: "",
    county: "",
    phoneNumber: "",
  });

  useEffect(() => {
    if (locations.data.length === 0) dispatch(location());
    dispatch(getEmployeeUpdateDetail(id));
  }, [dispatch, id]);
  useEffect(() => {
    setCities(locations.data.map((item) => item.name));
  }, [locations]);

  useEffect(() => {
    if (formData.city && locations.data.length !== 0) {
      setCounties(
        locations.data
          .filter((item) => item.name === formData.city)[0]
          .districts.map((item) => item.name)
      );
    }
  }, [formData.city, locations]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        imgFile: file,
      }));
      setImageUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (employeeUpdateDetail.data) {
      setFormData({
        imgFile: "",
        address: employeeUpdateDetail.data.address || "",
        city: employeeUpdateDetail.data.city || "",
        county: employeeUpdateDetail.data.county || "",
        phoneNumber: employeeUpdateDetail.data.phoneNumber || "",
      });
      setImageUrl(employeeUpdateDetail.data.filePath || "");
    }
  }, [employeeUpdateDetail.data, locations]);

  const handleSave = () => {
    setLoading(true);
    setSuccess(false);

    const errors = {};
    if (imageUrl == "") {
      errors.imgFile = "Profile picture is required.";
      setShowProfilePictureAlert(true);
    }
    if (!formData.phoneNumber || !/^\d+$/.test(formData.phoneNumber)) {
      errors.phoneNumber = "Valid phone number is required.";
    }
    if (!formData.city) {
      errors.city = "City is required.";
    }
    if (!formData.county) {
      errors.county = "County is required.";
    }
    if (!formData.address) {
      errors.address = "Address is required.";
    }

    setValidationErrors(errors);

    // If there are validation errors, stop the save operation
    if (Object.keys(errors).length > 0) {
      setLoading(false);
      return;
    }

    const data = new FormData();
    data.append("ImgFile", formData.imgFile);
    data.append("PhoneNumber", formData.phoneNumber);
    data.append("Address", formData.address);
    data.append("City", formData.city);
    data.append("County", formData.county);

    editEmployee(id, data, (message, error) => {
      if (message) {
        toast.success(message);
      } else if (error) {
        toast.error(
          "Lütfen gerekli yerleri eksiksiz ve doğru şekilde giriniz."
        );
      } else {
        toast.warning("Bir hata ile karşılaşıldı. Tekrar deneyiniz.");
      }
      setLoading(false);
    });
  };
  const handleChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
    if (field === "city") setFormData((prev) => ({ ...prev, county: "" }));
  };

  return (
    <Box sx={{ textAlign: "left", marginTop: 4, marginLeft: 2 }}>
      <Paper
        elevation={5}
        sx={{
          padding: 6,
          display: "flex",
          flexDirection: "column",
          borderRadius: 16,
          boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
          width: "90%",
          maxWidth: "50vw",
          margin: "auto",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            marginBottom: 2,
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Kişisel Bilgileri Düzenle
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 2,
          }}
        >
          <Avatar
            src={imageUrl}
            alt="Profile Avatar"
            sx={{
              bgcolor: "primary.main",
              width: 120,
              height: 120,
              marginBottom: 1,
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          />
          <label htmlFor="imgFileName">
            <Input
              accept="image/*"
              style={{ display: "none" }}
              id="imgFileName"
              name="imgFileName"
              type="file"
              onChange={handleImageChange}
            />
            <Tooltip title="Edit Profile Picture" placement="bottom">
              <IconButton component="span" color="primary">
                <EditIcon />
              </IconButton>
            </Tooltip>
          </label>
        </Box>

        <TextField
          label="Telefon"
          value={formData.phoneNumber}
          onChange={(e) => {
            // Only allow numeric input for phone number
            if (/^\d+$/.test(e.target.value) || e.target.value === "") {
              handleChange("phoneNumber", e.target.value);
            }
          }}
          fullWidth
          margin="normal"
          variant="outlined"
          error={Boolean(validationErrors.phoneNumber)}
          helperText={validationErrors.phoneNumber}
        />
        <FormControl
          fullWidth
          margin="normal"
          variant="outlined"
          error={Boolean(validationErrors.city)}
        >
          <InputLabel htmlFor="city">Şehir</InputLabel>
          <Select
            id="city"
            label="Şehir"
            name="city"
            value={formData.city}
            onChange={(e) => {
              handleChange("city", e.target.value);
              // Reset county when city changes
              handleChange("county", "");
            }}
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
          margin="normal"
          variant="outlined"
          error={Boolean(validationErrors.county)}
          disabled={!formData.city}
        >
          <InputLabel htmlFor="county">İlçe</InputLabel>
          <Select
            id="county"
            label="İlçe"
            name="county"
            value={formData.county}
            onChange={(e) => handleChange("county", e.target.value)}
          >
            {counties.map((county) => (
              <MenuItem key={county} value={county}>
                {county}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Adres"
          value={formData.address}
          onChange={(e) => handleChange("address", e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          error={Boolean(validationErrors.address)}
          helperText={validationErrors.address}
        />

        {loading && (
          <CircularProgress sx={{ marginTop: 2, alignSelf: "center" }} />
        )}
        {success && (
          <Alert severity="success" sx={{ marginTop: 2, alignSelf: "center" }}>
            <AlertTitle>Success</AlertTitle>
            Employee details updated successfully!
          </Alert>
        )}

        {showRequiredFieldsAlert && (
          <Alert
            severity="error"
            sx={{ marginTop: 2, alignSelf: "center", marginBottom: 2 }}
          >
            Please fill in all required fields.
          </Alert>
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          startIcon={<SaveIcon />}
          sx={{
            borderRadius: 8,
            marginTop: 2,
            alignSelf: "center",
            width: "50%",
            fontWeight: "bold",
          }}
          disabled={
            !formData.phoneNumber ||
            !formData.city ||
            !formData.county ||
            !formData.address
          }
        >
          Kaydet
        </Button>

        <Snackbar
          open={showProfilePictureAlert}
          autoHideDuration={6000}
          onClose={() => setShowProfilePictureAlert(false)}
        >
          <AlertMessage
            onClose={() => setShowProfilePictureAlert(false)}
            severity="error"
          >
            Profile picture is required.
          </AlertMessage>
        </Snackbar>
      </Paper>
    </Box>
  );
};

export default PersonalEdit;
