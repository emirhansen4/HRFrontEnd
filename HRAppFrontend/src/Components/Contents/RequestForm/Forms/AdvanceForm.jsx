import MoneyIcon from "@mui/icons-material/Money";
import SaveIcon from "@mui/icons-material/Save";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  changeRetainer,
  getRetainer,
  sendRetainer,
} from "../../../../Services/apis/EmployeeOperations/RetainerOperations";
import ExistingAdvanceRequests from "../ExistingRequests/ExistingAdvanceRequests";
import { getAllRequests } from "../../../../Services/apis/EmployeeOperations/AdministorOperations";

export const AdvanceForm = () => {
  const [advancePaymentLoad, setAdvancePaymentLoad] = useState(false);
  const [advancePaymentId, setAdvancePaymentId] = useState(0);
  const [amountError, setAmountError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [eastereggError, setEastereggError] = useState(false);
  const [advancePayment, setAdvancePayment] = useState({
    type: "Individual",
    amount: "",
    currency: "TL",
    description: "",
  });
  const [bringAdvancePaymentUpdate, setBringAdvancePaymentUpdate] =
    useState(true);
  const dispatch = useDispatch();
  const retainer = useSelector((select) => select.retainer);

  useEffect(() => {
    if (retainer.data.length === 0) dispatch(getRetainer());
  }, []);

  const descriptionChange = (e) => {
    setAdvancePayment((prev) => ({
      ...prev,
      description: e.target.value,
    }));
    if (
      advancePayment.description.toLowerCase().includes("kredi kartı harcamas")
    ) {
      setEastereggError(true);
    } else {
      setEastereggError(false);
    }

    if (
      advancePayment.description.length > 20 &&
      advancePayment.description.length < 200
    ) {
      setDescriptionError(false);
    } else {
      setDescriptionError(true);
    }
  };

  const emountChange = (e) => {
    setAdvancePayment((prev) => ({
      ...prev,
      amount: e.target.value,
    }));
    if (/^\d*\.?\d*$/.test(e.target.value) && e.target.value.length > 0) {
      setAmountError(false);
    } else {
      setAmountError(true);
    }
  };

  const advancePaymentUpdate = (id) => {
    const filteredValue = retainer.data.filter(
      (item) => item.advancePaymentId == id
    );
    setAdvancePaymentId(id);
    setAdvancePayment({
      type: filteredValue[0].advanceType,
      amount: filteredValue[0].amount,
      currency: filteredValue[0].currency,
      description: filteredValue[0].description,
    });
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setBringAdvancePaymentUpdate(false);
  };

  const backUpdate = () => {
    setBringAdvancePaymentUpdate(true);
    setAdvancePayment({
      type: "Individual",
      amount: "",
      currency: "TL",
      description: "",
    });
  };

  const handleRetainerUpdateRequest = () => {
    if (amountError || descriptionError) return 0;
    setAdvancePaymentLoad(true);
    changeRetainer(advancePayment, advancePaymentId, (message, error) => {
      if (message) {
        toast.success("Talebiniz değiştirilmiştir.");
        dispatch(getRetainer());
        setAdvancePayment({
          type: "Individual",
          amount: "",
          currency: "TL",
          description: "",
        });
        setBringAdvancePaymentUpdate(true);
      } else if (error) {
        toast.error("Girilen verileri kontrol ediniz.");
      } else {
        toast.warning("Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.");
      }
      setAdvancePaymentLoad(false);
    });
  };

  const handleRetainerRequest = () => {
    setAdvancePaymentLoad(true);
    sendRetainer(advancePayment, (message, error) => {
      if (message) {
        toast.success("Talebiniz gönderilmiştir.");
        dispatch(getRetainer());
        dispatch(getAllRequests());
        setAdvancePayment({
          type: "Individual",
          amount: "",
          currency: "TL",
          description: "",
        });
      } else if (error) {
        toast.error("Girilen verileri kontrol ediniz.");
      } else {
        toast.warning("Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.");
      }
      setAdvancePaymentLoad(false);
    });
  };

  return (
    <>
      <RadioGroup
        row
        aria-label="AdvancePayment-type"
        name="AdvancePayment-type"
        value={advancePayment.type}
        onChange={(e) =>
          setAdvancePayment((prev) => ({
            ...prev,
            type: e.target.value,
          }))
        }
        sx={{ marginBottom: 1 }}
      >
        <FormControlLabel
          value="Individual"
          control={<Radio />}
          label="Kişisel Harcama"
        />
        <FormControlLabel
          value="Institutional"
          control={<Radio />}
          label="Şirket Harcaması"
        />
      </RadioGroup>
      <TextField
        label="Avans Miktarı"
        type="text"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <MoneyIcon />
            </InputAdornment>
          ),
        }}
        value={advancePayment.amount}
        onChange={emountChange}
        helperText={
          amountError
            ? "Lütfen girilen değerin sayı olduğuna dikkat ediniz."
            : null
        }
        error={amountError}
        sx={{ marginBottom: 2, width: "20vw" }}
      />
      <FormControl
        variant="outlined"
        sx={{ marginBottom: 2, width: "8rem", marginLeft: "1rem" }}
      >
        <InputLabel htmlFor="currency">Para Birimi</InputLabel>
        <Select
          id="currency"
          label="Para Birimi"
          value={advancePayment.currency}
          onChange={(e) =>
            setAdvancePayment((prev) => ({
              ...prev,
              currency: e.target.value,
            }))
          }
        >
          <MenuItem value="TL">₺</MenuItem>
          <MenuItem value="USD">$</MenuItem>
          <MenuItem value="Euro">€</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Açıklama"
        multiline
        rows={2}
        fullWidth
        value={advancePayment.description}
        onChange={descriptionChange}
        helperText={eastereggError ? "Yine ne aldın? 🐰" : null}
        error={eastereggError}
        sx={{ marginBottom: 2 }}
      />
      {bringAdvancePaymentUpdate ? (
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          sx={{
            backgroundColor: advancePaymentLoad
              ? "grey"
              : "background.backgroundSecondary",
            fontSize: "14px",
            color: "text.primary",
          }}
          onClick={handleRetainerRequest}
          disabled={
            advancePaymentLoad ||
            !advancePayment.amount ||
            !advancePayment.description
          }
        >
          Talebi Gönder
          {advancePaymentLoad ? (
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
      ) : (
        <>
          <Button
            variant="contained"
            sx={{
              backgroundColor: advancePaymentLoad
                ? "grey"
                : "background.backgroundSecondary",
              marginTop: "8px",
              fontSize: "18px",
              color: "text.primary",
            }}
            onClick={handleRetainerUpdateRequest}
            disabled={
              advancePaymentLoad ||
              !advancePayment.amount ||
              !advancePayment.description
            }
          >
            Değiştir
            {advancePaymentLoad ? (
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
          </Button>{" "}
          <Button
            variant="contained"
            sx={{
              backgroundColor: "background.backgroundSecondary",
              marginTop: "8px",
              fontSize: "18px",
              color: "text.primary",
            }}
            onClick={backUpdate}
            disabled={advancePaymentLoad}
          >
            Geri dön
          </Button>
        </>
      )}
      <ExistingAdvanceRequests
        key="Advance"
        datas={retainer.data}
        updateRequest={advancePaymentUpdate}
      />
    </>
  );
};
