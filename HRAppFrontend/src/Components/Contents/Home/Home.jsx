import { CircularProgress, Container, Grid } from "@mui/material";
import { motion, useAnimation } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { profileSummary } from "../../../Services/apis/profileService";
import { decode } from "../../../Services/JwtDecoder";
import HomeSummaryCard from "./HomeSummaryCard";
import QuickRequests from "./QuickRequest";

const Home = () => {
  const [profileData, setProfileData] = useState(null);
  const [showComponent, setShowComponent] = useState(true)
  const dispatch = useDispatch();
  const controlsLeft = useAnimation(); // Controls for left animation
  const controlsRight = useAnimation(); // Controls for right animation
  const { data, loading } = useSelector((state) => state.summary);

  //component ın görünüp görünmemesini ayarlıyor.
  const requestChange = (isData) => {
    setShowComponent(isData);
  }

  // Decode the JWT token
  const decodedToken = decode();
  const isAdmin = decodedToken.currentRole === "Admin";

  useEffect(() => {
    dispatch(profileSummary());
  }, [dispatch]);

  useEffect(() => {
    setProfileData(data);

    // Trigger animation when data is loaded
    controlsLeft.start({ opacity: 1, x: 0 });
    controlsRight.start({ opacity: 1, x: 0 });
  }, [data, controlsLeft, controlsRight]);

  return (
    <Container component="main">
      {loading ? (
        <Grid container justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress size={60} />
        </Grid>
      ) : (
        <Grid container spacing={2} alignContent="center" justifyContent="center" >
          <Grid item xs={12} md={8}>
            <motion.div
              initial={{ opacity: 0, x: -200 }}
              animate={controlsLeft}
              transition={{ duration: 1 }}
            >
              <HomeSummaryCard profileData={profileData} loading={loading} />
            </motion.div>
          </Grid>
          {isAdmin && profileData && showComponent && (
            <Grid item xs={12} md={8} sx={{ marginTop: 2 }}>
              <motion.div
                initial={{ opacity: 0, x: 200 }}
                animate={controlsRight}
                transition={{ duration: 1 }}
              >
                {profileData && <QuickRequests requestChange={requestChange} />}
              </motion.div>
            </Grid>
          )}
        </Grid>
      )}
    </Container>
  );
};

export default Home;
