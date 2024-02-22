import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Slide,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
  Pagination,
  Chip,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  changeRequestStatus,
  getAllRequests,
} from "../../../Services/apis/EmployeeOperations/AdministorOperations";
import { decode } from "../../../Services/JwtDecoder";

const StyledTableContainer = styled(TableContainer)({
  borderRadius: 8,
  boxShadow: "0px 4px 18px rgba(0, 0, 0, 0.1)",
  overflow: "hidden",
});

const QuickRequests = ({requestChange}) => {
  const [requests, setRequests] = useState([]);
  const [showComponent, setShowComponent] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const decodedToken = decode();
  const itemsPerPage = 5;

  const dispatch = useDispatch();
  const allRequests = useSelector((state) => state.requests);

  useEffect(() => {
    if (requests.length === 0) dispatch(getAllRequests());
  }, [requests, dispatch]);

  useEffect(() => {
    if (allRequests.data) {
      const newRequests = [];

      const processRequests = (data, processType) => {
        if (data && data.length !== 0) {
          data.forEach((element) => {
            if (element.approvalStatus === "Waiting") {
              newRequests.push({
                id: element.processType + element[`${processType}Id`],
                requestId: element[`${processType}Id`],
                employeeName: element.fullName,
                requestType: element.processType,
                amount: element.amount,
                currency: element.currency,
                status: element.approvalStatus,
              });
            }
          });
        }
      };

      processRequests(allRequests.data.advancePayments, "advancePayment");
      processRequests(allRequests.data.expenses, "expense");
      processRequests(allRequests.data.leaves, "leave");

      setRequests(newRequests);
      setShowComponent(newRequests.length > 0);
      requestChange(newRequests.length > 0);
    }
  }, [allRequests.data]);

  const currentUserFullName = `${decodedToken.firstName} ${decodedToken.lastName}`;

  const handleRequestAction = (id, processResult) => {
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
            toast.success(
              `Talep ${
                processResult ? "onaylanma" : "reddi"
              } başarılıdır.`
            );
            setRequests((prevRequests) =>
              prevRequests.filter((request) => request.id !== id)
            );

            setShowComponent(false);
          } else {
            toast.warning(
              `Talep ${
                processResult ? "onaylanmada" : "reddinde"
              } sorun oluşmuştur. Lütfen tekrar deneyiniz.`
            );
          }
        }
      );
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = requests.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Slide direction="up" in={showComponent} mountOnEnter unmountOnExit>
      <Card sx={{ p: 1, borderRadius: 4, display: "block", boxShadow: "0px 0px 12px rgba(0, 0, 0, 0.1)" }}>
        <CardContent>
          <Box>
            <Typography variant="h2" sx={{fontSize:"1rem", marginBottom: "0.7rem"}}>Bekleyen Talepler</Typography>
          </Box>
          <StyledTableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Çalışan Adı</TableCell>
                  <TableCell align="center">Para Miktarı</TableCell>
                  <TableCell align="center">İşlemler</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentItems.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>{request.employeeName || "-"}</TableCell>
                    <TableCell align="center">
                      {request.amount} {request.currency || "-"}
                    </TableCell>
                    <TableCell align="center">                     
                          {request.status === "Waiting" ? (
                            <>
                              <Button
                                variant="contained"
                                color="success"
                                size="small"
                                onClick={() => handleRequestAction(request.id, true)}
                              >
                                Onayla
                              </Button>
                              <Button
                                variant="contained"
                                color="error"
                                size="small"
                                onClick={() => handleRequestAction(request.id, false)}
                                style={{ marginLeft: "4px" }}
                              >
                                Reddet
                              </Button>
                            </>
                          ) : (
                            <Chip
                              label="Talep zaten işlenmiştir."
                              color="error"
                              variant="outlined"
                              sx={{ minWidth: "240px" }}
                            />
                          )}
                      {/* {request.employeeName === currentUserFullName && (
                        <Chip
                          label="Kendi taleplerinizi onaylayamazsınız."
                          color="error"
                          variant="outlined"
                          sx={{ minWidth: "240px" }}
                        />
                      )} */}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </StyledTableContainer>

          <Box sx={{ marginTop: 2 }}>
            <Pagination
              count={Math.ceil(requests.length / itemsPerPage)}
              page={currentPage}
              onChange={(event, page) => paginate(page)}
            />
          </Box>
        </CardContent>
      </Card>
    </Slide>
  );
};

export default QuickRequests;
