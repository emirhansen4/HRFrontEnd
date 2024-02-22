import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { profileDetails } from "../../../Services/apis/profileService";
import ProfileHeader from "./ProfileHeader";
import PersonalInfoCard from "./PersonalInfoCard";
import ContactInfoCard from "./ContactInfoCard";
import EventDetailsCard from "./EventDetailsCard";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const controlsHeader = useAnimation(); // Controls for header animation
  const controlsPersonal = useAnimation(); // Controls for personal info animation
  const controlsContact = useAnimation(); // Controls for contact info animation
  const controlsEvent = useAnimation(); // Controls for event details animation

  useEffect(() => {
    dispatch(profileDetails());
  }, [dispatch]);

  const { data, loading, error } = useSelector((state) => state.details);

  useEffect(() => {
    // Trigger animation when data is loaded
    controlsHeader.start({ opacity: 1, x: 0 });
    controlsPersonal.start({ opacity: 1, x: 0 });
    controlsContact.start({ opacity: 1, x: 0 });
    controlsEvent.start({ opacity: 1, x: 0 });
  }, [controlsHeader, controlsPersonal, controlsContact, controlsEvent]);

  return (
    <Box sx={{ marginLeft: 8, marginRight: 4 }}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={4} sx={{ marginTop: 2 }}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={controlsHeader}
            transition={{ duration: 1 }}
          >
            <ProfileHeader data={data} navigate={navigate} />
          </motion.div>
        </Grid>
        <Grid item xs={12} md={8} sx={{ marginTop: 2 }}>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={controlsPersonal}
            transition={{ duration: 1 }}
          >
            <PersonalInfoCard data={data} />
          </motion.div>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ marginTop: 1 }}>
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={controlsContact}
            transition={{ duration: 1 }}
          >
            <ContactInfoCard data={data} />
          </motion.div>
        </Grid>

        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={controlsEvent}
            transition={{ duration: 1 }}
          >
            <EventDetailsCard data={data} />
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
