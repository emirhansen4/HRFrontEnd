import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { extendSubscription } from "../../../../Services/apis/companyService";
import { toast } from "react-toastify";

export const ExtendDialog = ({
  open,
  id,
  companyName,
  endDate,
  dialogClose,
}) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [date, setDate] = useState("01.01.2000");
  const [daysLeft, setDaysLeft] = useState(null);

  useEffect(() => {
    setDialogIsOpen(open);
    if (endDate) {
      setDate(endDate.split("T")[0]);
      setDaysLeft(calculateDaysLeft(endDate));
    }
  }, [open, id, endDate]);

  const handleClose = () => {
    setDialogIsOpen(false);
    dialogClose();
  };

  const handleCloseChanged = () => {
    extendSubscription(
      { CompanyId: id, SubscriptionEnd: date },
      (message, error) => {
        if (message) {
          toast.success("Abonelik biriş tarihi güncellenmiştir.");
          setDialogIsOpen(false);
          dialogClose(date);
        } else if (error) {
          toast.error("Abonelik bitiş tarihininde hata ile karşılaşıldı");
        } else {
          toast.warning("Bir hata ile karşılaşıldı. Lütfen tekrar deneyiniz.");
        }
      }
    );
  };

  const handleInputChange = (event) => {
    const selectedDate = event.target.value;
    setDate(selectedDate);
    setDaysLeft(calculateDaysLeft(selectedDate));
  };

  const calculateDaysLeft = (selectedDate) => {
    const endDate = new Date(selectedDate);
    const today = new Date();
    const ms = endDate.getTime() - today.getTime();
    return ms / (1000 * 60 * 60 * 24) > 0
      ? Math.ceil(ms / (1000 * 60 * 60 * 24))
      : 0;
  };

  const isDateValid = () => {
    const selectedDate = new Date(date);
    const today = new Date();
    return selectedDate >= today;
  };

  return (
    <Dialog
      open={dialogIsOpen}
      aria-labelledby="extend-dialog-title"
      aria-describedby="extend-dialog-description"
    >
      <DialogTitle id="extend-dialog-title">
        {companyName} şirketinin abonelik bitiş tarihini giriniz.
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="extend-dialog-description">
          <TextField
            label="Abonelik Bitişi"
            type="date"
            fullWidth
            value={date}
            onChange={handleInputChange}
            sx={{ marginTop: 1 }}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
          {daysLeft !== null && (
            <Typography variant="body2" sx={{ marginTop: 1 }}>
              Yeni abonelik bitiş tarihi ile kalan gün sayısı: {daysLeft}
            </Typography>
          )}
          {!isDateValid() && (
            <Typography variant="body2" color="error" sx={{ marginTop: 1 }}>
              Bitiş tarihi günün tarhinden önce girilemez.
            </Typography>
          )}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          startIcon={<CancelIcon />}
          color="error"
          variant="outlined"
        >
          İptal
        </Button>
        <Button
          onClick={handleCloseChanged}
          autoFocus
          startIcon={<CheckCircleIcon />}
          color="success"
          variant="outlined"
          disabled={!isDateValid()}
        >
          Onayla
        </Button>
      </DialogActions>
    </Dialog>
  );
};
