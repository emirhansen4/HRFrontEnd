import {
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ExistingLeaveRequests from "../ExistingRequests/ExistingLeaveRequests";
import DateRangeIcon from "@mui/icons-material/DateRange";
import SaveIcon from "@mui/icons-material/Save";
import {
  changeLeave,
  getLeave,
  sendLeave,
} from "../../../../Services/apis/EmployeeOperations/LeaveOperations";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

export const LeaveForm = () => {
  const [datas, setDatas] = useState({
    dayOffType: "",
    beginningDate: "",
    endingDate: "",
    description: "",
  });
  const [endingDateError, setEndingDateError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [endDatedisabled, setEndDateDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedDays, setSelectedDays] = useState(0);
  const [leaveId, setLeaveId] = useState(0);
  const [bringLeaveUpdate, setBringLeaveUpdate] = useState(true);
  const dispatch = useDispatch();
  const leaveDatas = useSelector((select) => select.leave);

  useEffect(() => {
    if (leaveDatas.data.length === 0) dispatch(getLeave());
  }, []);

  const handleDayoffChange = (event) => {
    setDatas((prev) => ({
      ...prev,
      dayOffType: event.target.value,
    }));
    switch (event.target.value) {
      case "YillikIzin":
        setEndDateDisabled(false);
        break;
      case "UcretsizIzin":
        setEndDateDisabled(true);
        setSelectedDays(2);
        break;
      case "MazeretIzni":
        setEndDateDisabled(true);
        setSelectedDays(1);
        break;
      case "RaporluIzin":
        setEndDateDisabled(false);
        break;
      case "OzelIzin":
        setEndDateDisabled(true);
        setSelectedDays(3);
        break;
      case "DogumIzni":
        setEndDateDisabled(true);
        setSelectedDays(112);
        break;
      case "EvlilikIzni":
        setEndDateDisabled(true);
        setSelectedDays(2);
        break;
      case "OlumIzni":
        setEndDateDisabled(true);
        setSelectedDays(1);
        break;
    }

    if (endDatedisabled && datas.beginningDate) {
      let startingDate = new Date(datas.beginningDate);
      let endingDate = new Date(startingDate);
      endingDate.setDate(startingDate.getDate() + selectedDays);
      let formattedEndingDate = endingDate.toISOString().split("T")[0];
      setEndingDateError(false);
      setDatas((prev) => ({
        ...prev,
        endingDate: formattedEndingDate,
      }));
    }
  };

  const handleBeginningDateChange = (event) => {
    if (
      datas.endingDate &&
      new Date(datas.endingDate) <= new Date(event.target.value)
    ) {
      setEndingDateError(true);
    } else {
      setEndingDateError(false);
    }
    if (
      datas.endingDate &&
      !endDatedisabled &&
      new Date(datas.endingDate) > new Date(event.target.value)
    ) {
      calculateSelectedDays(event.target.value, datas.endingDate);
    }
    if (endDatedisabled) {
      let startingDate = new Date(event.target.value);
      let endingDate = new Date(startingDate);
      endingDate.setDate(startingDate.getDate() + selectedDays);
      let formattedEndingDate = endingDate.toISOString().split("T")[0];
      setEndingDateError(false);
      setDatas((prev) => ({
        ...prev,
        endingDate: formattedEndingDate,
      }));
    }

    setDatas((prev) => ({
      ...prev,
      beginningDate: event.target.value,
    }));
  };

  const handleEndingDateChange = (event) => {
    if (
      datas.beginningDate &&
      new Date(datas.beginningDate) >= new Date(event.target.value)
    ) {
      setEndingDateError(true);
    } else {
      setEndingDateError(false);
    }
    if (
      datas.beginningDate &&
      new Date(datas.beginningDate) <= new Date(event.target.value)
    ) {
      calculateSelectedDays(datas.beginningDate, event.target.value);
    }
    setDatas((prev) => ({
      ...prev,
      endingDate: event.target.value,
    }));
  };

  const handleDescriptionChange = (event) => {
    if (event.target.value.length < 20) {
      setDescriptionError(true);
    } else {
      setDescriptionError(false);
    }

    setDatas((prev) => ({
      ...prev,
      description: event.target.value,
    }));
  };

  const calculateSelectedDays = (start, end) => {
    if (start && end)
      setSelectedDays(
        Math.ceil((new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24))
      );
  };

  const leaveUpdate = (id) => {
    const filteredValue = leaveDatas.data.filter((item) => item.leaveID == id);
    setLeaveId(id);
    setDatas({
      dayOffType: filteredValue[0].type,
      beginningDate: filteredValue[0].leaveDate.split("T")[0],
      endingDate: filteredValue[0].dueDate.split("T")[0],
      description: filteredValue[0].description,
    });

    if (
      filteredValue[0].type == "YillikIzin" ||
      filteredValue[0].type == "RaporluIzin"
    ) {
      setEndDateDisabled(false);
    } else {
      setEndDateDisabled(true);
    }

    calculateSelectedDays(filteredValue[0].leaveDate, filteredValue[0].dueDate);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setBringLeaveUpdate(false);
  };

  const backUpdate = () => {
    setBringLeaveUpdate(true);
    setDatas({
      dayOffType: "",
      beginningDate: "",
      endingDate: "",
      description: "",
    });
    setSelectedDays(0);
  };

  const handleRequestUpdateSubmit = () => {
    setLoading(true);
    changeLeave(
      {
        type: datas.dayOffType,
        leaveDate: datas.beginningDate,
        dueDate: datas.endingDate,
        description: datas.description,
      },
      leaveId,
      (message, error) => {
        if (message) {
          toast.success("Talebiniz gönderilmiştir.");
          dispatch(getLeave());
          setDatas({
            dayOffType: "",
            beginningDate: "",
            endingDate: "",
            description: "",
          });
          setSelectedDays(0);
        } else if (error) {
          toast.error("Girilen verileri kontrol ediniz.");
        } else {
          toast.warning("Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.");
        }
        setLoading(false);
      }
    );
  };

  const handleRequestSubmit = () => {
    sendLeave(
      {
        type: datas.dayOffType,
        leaveDate: datas.beginningDate,
        dueDate: datas.endingDate,
        description: datas.description,
      },
      (message, error) => {
        if (message) {
          toast.success("Talebiniz gönderilmiştir.");
          dispatch(getLeave());
          setDatas({
            dayOffType: "",
            beginningDate: "",
            endingDate: "",
            description: "",
          });
          setSelectedDays(0);
        } else if (error) {
          toast.error("Girilen verileri kontrol ediniz.");
        } else {
          toast.warning("Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.");
        }
      }
    );
  };

  return (
    <>
      <FormControl sx={{ width: 300 }}>
        <InputLabel id="LeaveType">İzin Tipi</InputLabel>
        <Select
          labelId="LeaveType"
          input={<OutlinedInput label="İzin tipi" />}
          value={datas.dayOffType}
          onChange={handleDayoffChange}
          style={{ width: "60%", marginBottom: "1rem" }}
        >
          <MenuItem key={1} value={"YillikIzin"}>
            Yıllık izin
          </MenuItem>
          <MenuItem key={2} value={"UcretsizIzin"}>
            ücretsiz izin
          </MenuItem>
          <MenuItem key={3} value={"MazeretIzni"}>
            Mazeret izini
          </MenuItem>
          <MenuItem key={4} value={"RaporluIzin"}>
            Rapor
          </MenuItem>
          <MenuItem key={5} value={"OzelIzin"}>
            Özel izin
          </MenuItem>
          <MenuItem key={7} value={"DogumIzni"}>
            Doğum izini
          </MenuItem>
          <MenuItem key={8} value={"EvlilikIzni"}>
            Evlilik izini
          </MenuItem>
          <MenuItem key={9} value={"OlumIzni"}>
            Ölüm izini
          </MenuItem>
        </Select>
      </FormControl>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Başlangıç Tarihi"
            type="date"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <DateRangeIcon />
                </InputAdornment>
              ),
            }}
            onChange={handleBeginningDateChange}
            value={datas.beginningDate}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Bitiş Tarihi"
            type="date"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <DateRangeIcon />
                </InputAdornment>
              ),
            }}
            onChange={handleEndingDateChange}
            value={datas.endingDate}
            error={endingDateError}
            helperText={
              endingDateError
                ? "Lütfen bitiş tarihini başlangıç tarihinden büyük bir değer giriniz"
                : ""
            }
            disabled={endDatedisabled}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Açıklama"
            multiline
            rows={4}
            fullWidth
            onChange={handleDescriptionChange}
            value={datas.description}
            sx={{ marginBottom: 2 }}
            error={descriptionError}
            helperText={
              descriptionError ? "En az 20 karekter girilmelidir." : ""
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Paper
            elevation={3}
            sx={{ padding: 2.5, borderRadius: 4, marginBottom: 3 }}
          >
            <Typography>
              {endingDateError ? 0 : selectedDays} gün seçildi
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      {bringLeaveUpdate ? (
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          sx={{
            backgroundColor: loading
              ? "grey"
              : "background.backgroundSecondary",
            fontSize: "14px",
            color: "text.primary",
          }}
          onClick={handleRequestSubmit}
          disabled={
            descriptionError ||
            endingDateError ||
            !datas.beginningDate ||
            !datas.dayOffType ||
            !datas.description ||
            !datas.endingDate
          }
        >
          Talebi Gönder
          {loading ? (
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
              backgroundColor: loading
                ? "grey"
                : "background.backgroundSecondary",
              marginTop: "8px",
              fontSize: "18px",
              color: "text.primary",
            }}
            onClick={handleRequestUpdateSubmit}
            disabled={
              descriptionError ||
              endingDateError ||
              !datas.beginningDate ||
              !datas.dayOffType ||
              !datas.description ||
              !datas.endingDate
            }
          >
            Değiştir
            {loading ? (
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
            // disabled={}
          >
            Geri dön
          </Button>
        </>
      )}
      <ExistingLeaveRequests
        key="dayOff"
        datas={leaveDatas.data}
        updateRequest={leaveUpdate}
      />
    </>
  );
};
