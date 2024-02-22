import React, { useState } from "react";
import {
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Box,
  IconButton,
  Tooltip,
  Zoom,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import SendIcon from "@mui/icons-material/Send";
import { sendMessage } from "../Services/apis/messageService";
import { toast } from "react-toastify";

const Contact = () => {
  const navigate = useNavigate();
  const [message, setMessage]= useState({
    name: "",
      email: "",
      subject: "",
      description: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(message, (message, error) => {
      if(message)
      toast.success("Mesajınız gönderilmiştir.")
    else if(error)
      toast.error(error);
    else
      toast.warning("Hata ile karşılaşıldı. Lütfen tekrar deneyiniz.")
    } );
  };

  return (
    <Box sx={{ margin: 2 }}>
      <Typography variant="h4" sx={{ marginBottom: 4 }}>
        İletişim
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Paper
              elevation={5}
              sx={{
                padding: 4,
                borderRadius: 12,
                backgroundColor: "background.main",
              }}
            >
              <Typography variant="h6" sx={{ marginBottom: 2, color: "text.primary", }}>
                Bize Ulaşın
              </Typography>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Adınız"
                      variant="outlined"
                      onChange={(e) => setMessage((prev) => ({ ...prev, name: e.target.value }))}
                      sx={{ marginBottom: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="E-posta Adresiniz"
                      type="email"
                      variant="outlined"
                      onChange={(e) => setMessage((prev) => ({ ...prev, email: e.target.value }))}
                      sx={{ marginBottom: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Konu"
                      variant="outlined"
                      sx={{ marginBottom: 2 }}
                      onChange={(e) => setMessage((prev) => ({ ...prev, subject: e.target.value }))}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      multiline
                      rows={4}
                      label="Mesajınız"
                      variant="outlined"
                      onChange={(e) => setMessage((prev) => ({ ...prev, description: e.target.value }))}
                      sx={{ marginBottom: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      endIcon={<SendIcon />}
                      disabled={
                        !message.name ||
                        !message.email ||
                        !message.subject ||
                        !message.description
                      }
                    >
                      Mesaj Gönder
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </motion.div>
        </Grid>
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Paper
              elevation={5}
              sx={{
                padding: 4,
                borderRadius: 12,
                backgroundColor: "background.main",
              }}
            >
              <Typography variant="h6" sx={{ marginBottom: 2, color: "text.primary" }}>
                Bilgilerimiz
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "text.primary",
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 1,
                }}
              >
                <LocationOnIcon sx={{ marginRight: 1 }} /> Adres: 123 Yeşil Sokak, Şehirville, Ülke
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "text.primary",
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 1,
                }}
              >
                <PhoneIcon sx={{ marginRight: 1 }} /> Telefon: +1 (123) 456-7890
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "text.primary",
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 2,
                }}
              >
                <EmailIcon sx={{ marginRight: 1 }} /> E-posta: info@example.com
              </Typography>
            </Paper>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Contact;
