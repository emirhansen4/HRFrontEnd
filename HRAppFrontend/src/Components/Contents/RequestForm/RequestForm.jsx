import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRetainer } from "../../../Services/apis/EmployeeOperations/RetainerOperations";
import { AdvanceForm } from "./Forms/AdvanceForm";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import MoneyIcon from "@mui/icons-material/Money";
import SaveIcon from "@mui/icons-material/Save";
import { LeaveForm } from "./Forms/LeaveForm";

const StyledCard = styled(Card)({
  borderRadius: "8px",
  padding: "20px",
  boxShadow: "0px 4px 18px rgba(0, 0, 0, 0.1)",
  backgroundColor: "background.main",
  transition: "all 0.5s ease-in-out",
});

const StyledButtonGroup = styled("div")({
  display: "flex",
  justifyContent: "left",
  marginBottom: "5px",
  color: "text.primary",
  padding: "10px",
});

const RequestForm = () => {
  const [requestType, setRequestType] = useState("AdvancePayment");
  // const [description, setDescription] = useState("");
  // const [expenseType, setExpenseType] = useState("Housing");
  // const [expenseAmount, setExpenseAmount] = useState("");
  // const [expenseCurrency, setExpenseCurrency] = useState("TL");
  const dispatch = useDispatch();
  const retainer = useSelector((select) => select.retainer);

  useEffect(() => {
    if (retainer.data.length === 0) dispatch(getRetainer());
  }, [dispatch, retainer.data.length]);

  // const handleExpenseTypeChange = (event) => setExpenseType(event.target.value);
  // const handleExpenseAmountChange = (event) => setExpenseAmount(event.target.value);
  // const handleExpenseCurrencyChange = (event) => setExpenseCurrency(event.target.value);
  // const handleDescriptionChange = (event) => setDescription(event.target.value);

  const handleRequestTypeChange = (type) => setRequestType(type);

  // const handleRequestSubmit = () => {

  // };

  return (
    <Box sx={{ padding: 3 }}>
      <StyledCard elevation={5}>
        <CardContent>
          <Typography variant="h5" sx={{ marginBottom: 1 }}>
            İstek Formu
          </Typography>

          <StyledButtonGroup>
            {[ "AdvancePayment", "dayOff"].map((type) => (
              <Button
                key={type}
                variant={requestType === type ? "contained" : "outlined"}
                onClick={() => handleRequestTypeChange(type)}
                sx={{ marginRight: 2 }} // Add margin-right for spacing
              >
                {type === "dayOff" ? "İzin Talebi" : "Avans Talebi"}
              </Button>
            ))}
          </StyledButtonGroup>

          {requestType === "dayOff" && <LeaveForm/> }

          {requestType === "AdvancePayment" && <AdvanceForm />}

          {/* {requestType === "expense" && (
            <>
              <FormControl fullWidth variant="outlined" sx={{ marginBottom: 2 }}>
                <InputLabel htmlFor="expense-type">Gider Türü</InputLabel>
                <Select
                  id="expense-type"
                  label="Gider Türü"
                  value={expenseType}
                  onChange={handleExpenseTypeChange}
                >
                  {["Travel", "Housing", "FoodAndDrinks", "Materials", "Education", "Health", "Fuel"].map((type) => (
                    <MenuItem key={type} value={type}>{type}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                label="Para Miktarı"
                type="number"
                fullWidth
                InputProps={{
                  startAdornment: <InputAdornment position="start"><MoneyIcon /></InputAdornment>,
                }}
                onChange={handleExpenseAmountChange}
                value={expenseAmount}
                sx={{ marginBottom: 2 }}
              />
              <FormControl fullWidth variant="outlined" sx={{ marginBottom: 2 }}>
                <InputLabel htmlFor="expense-currency">Para Birimi</InputLabel>
                <Select
                  id="expense-currency"
                  label="Para Birimi"
                  value={expenseCurrency}
                  onChange={handleExpenseCurrencyChange}
                >
                  {["TL", "USD", "EUR"].map((currency) => (
                    <MenuItem key={currency} value={currency}>{currency}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                label="Açıklama"
                multiline
                rows={4}
                fullWidth
                onChange={handleDescriptionChange}
                value={description}
                sx={{ marginBottom: 2 }}
              />
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleRequestSubmit}
                sx={{
                  backgroundColor: "background.main",
                  marginTop: "28px",
                  fontSize: "18px",
                  color: "text.primary",
                }}
              >
                Talebi Gönder
              </Button>
            </>)} */}
        </CardContent>
      </StyledCard>
    </Box>
  );
};

export default RequestForm;
