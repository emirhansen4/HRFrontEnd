import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import { getEmployeeDetail } from "../../../Services/apis/employeeService";

import PersonalInfoCard from "./PersonalInfoCard";
import ContactInfoCard from "./ContactInfoCard";
import BirthInfoCard from "./BirthInfoCard";
import PhotoCard from "./PhotoCard";

const PersonalDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getEmployeeDetail(id));
  }, [dispatch]);

  const handleEditClick = () => {
    navigate(`/personnelList/personalEdit/${id}`);
  };

  const { data, loading, error } = useSelector((state) => state.employeeDetail);


  return (
    <Box sx={{ margin: 3, marginLeft: 12}}>
      <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
          <PhotoCard data={data} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ContactInfoCard data={data} />
        </Grid>
        <Grid item xs={12} md={6}>
          <PersonalInfoCard data={data} />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <BirthInfoCard data={data} />
        </Grid>
        
      </Grid>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "10vh",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleEditClick}
          startIcon={<EditIcon />}
          sx={{ borderRadius: 8, marginTop: 0, backgroundColor: "background.main" }}
        >
          Kişisel Bilgileri Düzenle
        </Button>
      </Box>
    </Box>
  );
};

export default PersonalDetails;
