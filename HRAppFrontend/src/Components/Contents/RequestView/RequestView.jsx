import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
  IconButton,
  InputBase,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
  styled,
} from "@mui/material";
import {
  Check as CheckIcon,
  Clear as ClearIcon,
  Search as SearchIcon,
} from "@mui/icons-material";

import {
  AllInclusive as AllInclusiveIcon,
  HourglassEmpty as HourglassEmptyIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";

import { useDispatch, useSelector } from "react-redux";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { toast } from "react-toastify";
import {
  changeRequestStatus,
  getAllRequests,
} from "../../../Services/apis/EmployeeOperations/AdministorOperations";
import { decode } from "../../../Services/JwtDecoder";
import Collapse from "@mui/material/Collapse";
import ExpandIcon from "@mui/icons-material/Expand";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import BlockIcon from "@mui/icons-material/Block";

const StyledTableContainer = styled(TableContainer)({
  borderRadius: "16px",
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
  marginBottom: "16px",
});

const StyledInputBase = styled(InputBase)({
  marginLeft: "8px",
  flex: 1,
  fontSize: "14px",
});

const RequestView = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [hideOwnRequests, setHideOwnRequests] = useState(false);

  const dispatch = useDispatch();
  const allRequests = useSelector((state) => state.requests);

  useEffect(() => {
    if (requests.length === 0) dispatch(getAllRequests());
  }, [requests, dispatch]);

  useEffect(() => {
    setFilteredRequests([]);
    setRequests([]);
    if (allRequests.data.advancePayments) {
      const newData = allRequests.data.advancePayments.map((element) => ({
        id: element.processType + element.advancePaymentId,
        requestId: element.advancePaymentId,
        employeeName: element.fullName,
        requestType: "AdvancePayment",
        amount: element.amount,
        currency: element.currency,
        status: element.approvalStatus,
        type: element.advanceType,
        description: element.description,
        leaveType: null,
        leaveDate: null,
        dueDate: null,
      }));
      console.log(newData);
      newData.sort((a, b) => b.requestId - a.requestId);

      setRequests((prev) => [...prev, ...newData]);
      setFilteredRequests((prev) => [...prev, ...newData]);
    }
    if (allRequests.data.leaves) {
      const newData = allRequests.data.leaves.map((element) => ({
        id: element.processType + element.leaveID,
        requestId: element.leaveID,
        employeeName: element.fullName,
        requestType: "Leave",
        amount: null,
        currency: null,
        status: element.status,
        type: null,
        leaveType: element.type,
        description: element.description,
        leaveDate: element.leaveDate.split("T")[0],
        dueDate: element.requestDate.split("T")[0],
      }));

      console.log(newData);
      newData.sort((a, b) => b.requestId - a.requestId);

      setRequests((prev) => [...prev, ...newData]);
      setFilteredRequests((prev) => [...prev, ...newData]);
    }
  }, [allRequests.data]);
  console.log(allRequests);

  const decodedToken = decode();
  const currentUserFullName = `${decodedToken.firstName} ${decodedToken.lastName}`;

  const [detailedView, setDetailedView] = useState(null);

  const handleToggleDetailedView = (id) => {
    setDetailedView((prev) => (prev === id ? null : id));
  };
  const handleRequestAction = (id, processResult, status) => {
    const changedItem = requests.find((request) => request.id === id);

    if (changedItem) {
      changeRequestStatus(
        {
          processId: String(changedItem.requestId),
          processType: changedItem.requestType,
          processResult,
        },
        (message, error) => {
          if (message) {
            toast.success(`Talep ${status} başarılıdır.`);
            setRequests((prevRequests) =>
              prevRequests.map((request) =>
                request.id === id ? { ...request, status } : request
              )
            );
            setFilteredRequests((prevRequests) =>
              prevRequests.map((request) =>
                request.id === id
                  ? {
                      ...request,
                      status: status == "onayla" ? "Approved" : "Denied",
                    }
                  : request
              )
            );
          } else {
            toast.warning(
              `Talep ${status}de sorun oluşmuştur. Lütfen tekrar deneyiniz.`
            );
          }
        }
      );
    }
  };

  const handleStatusChange = (event, newStatus) => {
    setSelectedStatus(newStatus);
    filterRequests(newStatus, searchTerm);
  };

  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    filterRequests(selectedStatus, term);
  };

  const filterRequests = (status, term, hideOwn) => {
    let filteredData = requests;

    if (hideOwn) {
      filteredData = filteredData.filter(
        (request) => request.employeeName !== currentUserFullName
      );
    }

    if (status) {
      filteredData = filteredData.filter(
        (request) => request.status === status
      );
    }

    if (term) {
      const lowerCaseTerm = term.toLowerCase();
      filteredData = filteredData.filter((request) =>
        request.employeeName.toLowerCase().includes(lowerCaseTerm)
      );
    }

    setFilteredRequests(filteredData);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ p: 3, margin: "1px" }}>
      <Box
        sx={{
          mb: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5">Avans Talepleri</Typography>
        <Box>
          <IconButton sx={{ padding: 0 }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <StyledInputBase
            placeholder="Çalışan Adına Göre Ara"
            onChange={handleSearchChange}
            value={searchTerm}
            sx={{
              padding: "5px",
              width: "200px",
              border: "1px solid #aaa",
              marginRight: "500px",
              borderRadius: "20px",
            }}
          />
          <ToggleButtonGroup
            value={selectedStatus}
            exclusive
            onChange={handleStatusChange}
            size="small"
          >
            <ToggleButton value={null}>
              <AllInclusiveIcon sx={{ marginRight: 0.5 }} />
              Tümü
            </ToggleButton>
            <ToggleButton value="Waiting">
              <HourglassEmptyIcon sx={{ marginRight: 0.5 }} />
              Onay Bekliyor
            </ToggleButton>
            <ToggleButton value="Approved">
              <CheckCircleOutlineIcon sx={{ marginRight: 0.5 }} />
              Onaylandı
            </ToggleButton>
            <ToggleButton value="Rejected">
              <CancelIcon sx={{ marginRight: 0.5 }} />
              Reddedildi
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>
      <StyledTableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Çalışan Adı</TableCell>
              <TableCell align="center">Tür</TableCell>
              <TableCell align="center">Durum</TableCell>
              <TableCell align="center">Başlangıç Tarihi</TableCell>
              <TableCell align="center">Bitiş Tarihi</TableCell>
              <TableCell align="center">Para Miktarı</TableCell>
              <TableCell align="center">İşlemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? filteredRequests.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : filteredRequests
            ).map((request) => (
              <React.Fragment key={request.id}>
                <>
                  <TableRow>
                    <TableCell>
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: "bold",
                          fontSize: "0.9rem",
                          fontFamily: "Century Gothic, Roboto",
                        }}
                      >
                        {request.employeeName || "-"}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: "bold",
                          fontSize: "0.9rem",
                          fontFamily: "Century Gothic, Roboto",
                        }}
                      >
                        {request.type === "Individual"
                          ? "Kişisel Harcama"
                          : "Firma Harcaması"}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={
                          request.status === "Waiting"
                            ? "Onay Bekliyor"
                            : request.status === "Approved"
                            ? "Onaylandı"
                            : "Reddedildi"
                        }
                        color={
                          request.status === "Waiting"
                            ? "default"
                            : request.status === "Approved"
                            ? "success"
                            : "error"
                        }
                        variant="outlined"
                        sx={{
                          backgroundColor:
                            request.status === "Waiting"
                              ? "#E0E0E036"
                              : request.status === "Approved"
                              ? "#00800025"
                              : "#D8431525",
                          fontWeight: "bold",
                          fontSize: "0.9rem",
                          fontFamily: "Century Gothic, Roboto",
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: "bold",
                          fontSize: "0.9rem",
                          fontFamily: "Century Gothic, Roboto",
                        }}
                      >
                        {request.leaveDate || "-"}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: "bold",
                          fontSize: "0.9rem",
                          fontFamily: "Century Gothic, Roboto",
                        }}
                      >
                        {request.dueDate || "-"}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: "bold",
                          fontSize: "0.9rem",
                          fontFamily: "Century Gothic, Roboto",
                        }}
                      >
                        {request.amount} {request.currency || "-"}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      {/* Check if the request is not created by the current user */}
                      {request.employeeName !== currentUserFullName && (
                        <>
                          {request.status === "Waiting" ? (
                            <>
                              <Button
                                variant="contained"
                                size="small"
                                startIcon={<ExpandIcon />}
                                onClick={() =>
                                  handleToggleDetailedView(request.id)
                                }
                                sx={{ marginRight: "3px" }}
                              >
                                Detaylar
                              </Button>

                              <Button
                                variant="contained"
                                color="success"
                                size="small"
                                startIcon={<CheckIcon />}
                                onClick={() =>
                                  handleRequestAction(
                                    request.id,
                                    true,
                                    "onayla"
                                  )
                                }
                                sx={{ marginRight: "3px" }}
                              >
                                Onayla
                              </Button>

                              <Button
                                variant="contained"
                                color="error"
                                size="small"
                                startIcon={<ClearIcon />}
                                onClick={() =>
                                  handleRequestAction(
                                    request.id,
                                    false,
                                    "reddet"
                                  )
                                }
                              >
                                Reddet
                              </Button>
                            </>
                          ) : (
                            <Chip
                              label="Talep zaten işlenmiştir."
                              icon={
                                <DoneAllIcon
                                  sx={{
                                    fontSize: 16,
                                    marginRight: 1,
                                    color: "error.main",
                                  }}
                                />
                              }
                              color="error"
                              variant="outlined"
                              sx={{ minWidth: "280px" }}
                            />
                          )}
                        </>
                      )}
                      {request.employeeName === currentUserFullName && (
                        <Chip
                          label="Kendi taleplerinizi onaylayamazsınız."
                          icon={
                            <BlockIcon
                              sx={{
                                fontSize: 16,
                                marginRight: 1,
                                color: "error.main",
                              }}
                            />
                          }
                          color="error"
                          variant="outlined"
                          sx={{ minWidth: "280px" }}
                        />
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      style={{ paddingBottom: 0, paddingTop: 0 }}
                      colSpan={6}
                    >
                      <Collapse
                        in={detailedView === request.id}
                        timeout={{ enter: 600, exit: 300 }}
                        unmountOnExit
                      >
                        <Box
                          sx={{
                            margin: 1,
                            overflow: "hidden",
                            transition: "all 0.6s ease-in-out",
                            border: "1px solid #e0e0e0",
                            borderRadius: "8px",
                            backgroundColor: "background.paper",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                            padding: "16px",
                          }}
                        >
                          <Typography
                            variant="body1"
                            sx={{
                              marginBottom: 1,
                              color: "text.primary",
                            }}
                          >
                            <strong>İsim:</strong> {request.employeeName}
                          </Typography>
                          {request.leaveType ? (
                            <Typography
                              variant="body1"
                              sx={{ marginBottom: 1, color: "text.primary" }}
                            >
                              <strong>İzin tipi:</strong> {request.leaveType}
                            </Typography>
                          ) : (
                            ""
                          )}
                          {request.amount ? (
                            <Typography
                              variant="body1"
                              sx={{ marginBottom: 1, color: "text.primary" }}
                            >
                              <strong>Miktar:</strong> {request.amount}{" "}
                              {request.currency}
                            </Typography>
                          ) : (
                            ""
                          )}
                          <Typography
                            variant="body1"
                            sx={{ marginBottom: 1, color: "text.primary" }}
                          >
                            <strong>Açıklama:</strong> {request.description}
                          </Typography>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={filteredRequests.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Gösterilecek istek sayısı:"
        />
      </StyledTableContainer>
    </Box>
  );
};

export default RequestView;
