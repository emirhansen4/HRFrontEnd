import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Typography,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";
import InfoIcon from "@mui/icons-material/Info";

const ConfirmationDialogue = ({ open, handleClose, handleConfirm }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        <WarningIcon sx={{ color: "warning.main", marginRight: 1 }} />
        Onay
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography variant="body1">
            Bu şirketi silmek istediğinizden emin misiniz?
          </Typography>
        </DialogContentText>
        <DialogContentText>
          <Typography variant="body2" sx={{ display: "flex", alignItems: "center" , marginTop:"20px" }}>
            <InfoIcon sx={{ color: "info.main", marginRight: 1 }} />
            Şirketi silerseniz şirket admini dahil tüm hesapların girişi durdurulacaktır.
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          color="error"
          startIcon={<CancelIcon />}
          variant="outlined"
        >
          İptal
        </Button>
        <Button
          onClick={handleConfirm}
          color="success"
          startIcon={<CheckCircleIcon />}
          variant="outlined"
        >
          Onayla
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialogue;
