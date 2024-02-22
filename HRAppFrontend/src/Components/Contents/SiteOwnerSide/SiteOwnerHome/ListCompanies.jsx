import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  Collapse,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import { useDispatch, useSelector } from "react-redux";
import { companiesGet, companyDelete, stopSubscription } from "../../../../Services/apis/companyService";
import DeleteIcon from "@mui/icons-material/Delete";
import { ExtendDialog } from "./ExtendDialog";
import ConfirmationDialogue from "./ConfirmationDialogue";
import { toast } from "react-toastify";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";
import PanToolIcon from '@mui/icons-material/PanTool';

const ListCompanies = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [expandedItem, setExpandedItem] = useState(null);
  const [extensSubscription, setExtendSubscription] = useState({
    trigger: false,
    id: "",
    endDate: "",
    companyName: "",
  });
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [companyToDeleteId, setCompanyToDeleteId] = useState(null);
  const dispatch = useDispatch();
  const companies = useSelector((select) => select.companies);

  useEffect(() => {
    if (companies.data.length === 0){
      setLoading(true);
      dispatch(companiesGet());
      setLoading(companies.loading);
    } 
  }, []);

  const formatDate = (date) => {
    const newDate = new Date(date);
    return `${newDate.getDate()} / ${newDate.getMonth() + 1} / ${newDate.getFullYear()}`;
  };

  const remainingDay = (endDate) => {
    const newEndDate = new Date(endDate);
    const today = new Date();
    const ms = today.getTime() - newEndDate.getTime();
    return ms / (1000 * 60 * 60 * 24) > 0 ? 0 : Math.ceil(ms / (-1 * 1000 * 60 * 60 * 24));
  };

  const dialogClose = (changedDate) => {
    if (changedDate) {
      dispatch(companiesGet());
    }
    setExtendSubscription((prev) => [{ ...prev, trigger: false }]);
  };

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleExpandDetails = (id) =>
    setExpandedItem((prev) => (prev === id ? null : id));

  const handleStopSubscription = (id)=>{
    stopSubscription(id, (message, error)=>{
      if(message){
        toast.success("Abonelik durdurulmuştur.")
        dispatch(companiesGet());
      }else if(error){
        toast.error(error)
      }
      else{
        toast.warning("Bir hata oluştu. Lütfen tekrar deneyiniz.")
      }
    })
  }

  const handleExtendSubscription = (companyId, endDate, companyName) => {
    setExtendSubscription({
      trigger: true,
      id: companyId,
      endDate: endDate,
      companyName: companyName,
    });
  };

  const handleDeleteCompany = (id) => {
    setCompanyToDeleteId(id);
    setConfirmationDialogOpen(true);
  };

  const confirmDeleteCompany = () => {
    companyDelete(companyToDeleteId, (message, error) => {
      if (message) {
        toast.success("Şirket başarı ile silinmiştir.");
        dispatch(companiesGet());
      } else {
        toast.warning("Silme işleminde bir hata ile karşılaşıldı.");
      }
    });
    setConfirmationDialogOpen(false);
  };

  const closeConfirmationDialog = () => {
    setConfirmationDialogOpen(false);
  };

  return (
    <Box sx={{ margin: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => navigate("/addCompany")}
          sx={{ marginLeft: "auto" }}
        >
          Şirket Ekle
        </Button>
      </Box>

      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "400px",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer
          sx={{
            backgroundColor: "card.primary",
            transition: "background 0.5s ease-in-out",
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="h6">Logo</Typography>
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <Typography variant="h6">Şirket Adı</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <Typography variant="h6">Abonelik Başlangıcı</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <Typography variant="h6">Abonelik Sonu</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <Typography variant="h6">Kalan Abonelik (gün)</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">İşlemler</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {companies.data &&
                companies.data.map((company) => (
                  <React.Fragment key={company.companyId}>
                    <TableRow>
                      <TableCell>
                        <img
                          src={
                            company.logoPath && company.logoPath.length > 10
                              ? company.logoPath
                              : "https://img.freepik.com/premium-vector/colorful-bird-logo_165162-97.jpg"
                          }
                          alt={`${company.companyName} Logo`}
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: "50%",
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1">
                          {company.companyName}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1">
                          {formatDate(company.subscriptionStart)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1">
                          {formatDate(company.subscriptionEnd)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1">
                          {remainingDay(company.subscriptionEnd)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          <Tooltip title="Detayları Görüntüle">
                            <Button
                              variant="contained"
                              color="info"
                              size="small"
                              sx={{ marginRight: 1.5 }}
                              onClick={() =>
                                handleExpandDetails(company.companyId)
                              }
                              startIcon={<ExpandMoreIcon />}
                            >
                              Detay
                            </Button>
                          </Tooltip>
                          {!company.companyName.includes("Team Pulse") && (
                            <>  
                            <Tooltip title="Şirket Detaylarını Düzenle">
                            <Button
                              variant="contained"
                              color="secondary"
                              size="small"
                              onClick={() =>navigate(`/editCompany/${company.companyId}`)}
                              startIcon={<DisplaySettingsIcon />}
                            >
                              Düzenle
                            </Button>
                          </Tooltip>
                          <Tooltip title="Aboneliği Durdur">
                            <Button
                              variant="contained"
                              color="warning"
                              size="small"
                              onClick={() =>
                                handleStopSubscription(company.companyId)
                              }
                              disabled = {new Date(company.subscriptionEnd) <= new Date()}
                              startIcon={<PanToolIcon  />}
                            >
                              Durdur
                            </Button>
                          </Tooltip>
                          <Tooltip title="Abonelik Bitiş Tarihini Güncelle">
                            <Button
                              variant="contained"
                              color="success"
                              size="small"
                              onClick={() =>
                                handleExtendSubscription(
                                  company.companyId,
                                  company.subscriptionEnd,
                                  company.companyName
                                )
                              }
                              startIcon={<EventRepeatIcon />}
                            >
                              Güncelle
                            </Button>
                          </Tooltip>
                            <Tooltip title="Aboneliği sil">
                              <Button
                                variant="contained"
                                color="error"
                                size="small"
                                onClick={() => handleDeleteCompany(company.companyId)}
                                startIcon={<DeleteIcon />}
                              >
                                Sil
                              </Button>
                            </Tooltip>
                            </>
                          )}
                        </Box>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={6} style={{ padding: 0 }}>
                        <Collapse
                          in={expandedItem === company.companyId}
                          timeout="auto"
                          unmountOnExit
                          sx={{
                            height:
                              expandedItem === company.companyId ? "auto" : 0,
                            overflow: "hidden",
                            transition: "height 0.5s ease-in-out",
                          }}
                        >
                          <Box
                            sx={{
                              p: 5,
                              border: "1px solid #ddd",
                              borderRadius: 8,
                              marginTop: 1,
                              marginBottom: 1,
                              backgroundColor: "background.main",
                              transition: "background 0.5s ease-in-out",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                marginBottom: 2,
                              }}
                            >
                              <InfoIcon
                                fontSize="medium"
                                color="primary"
                                style={{
                                  marginRight: "10px",
                                  fontWeight: "bold",
                                }}
                              />
                              <Typography
                                variant="h5"
                                style={{ marginRight: 1, fontWeight: "bold" }}
                              >
                                Şirket Bilgileri:
                              </Typography>
                            </Box>
                            <Typography
                              variant="body2"
                              style={{
                                fontSize: "1.2rem",
                                fontFamily: "Roboto",
                                marginLeft: "2rem",
                              }}
                            >
                              {company.description}
                            </Typography>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))}
            </TableBody>
          </Table>
          <ExtendDialog
            open={extensSubscription.trigger}
            id={extensSubscription.id}
            endDate={extensSubscription.endDate}
            companyName={extensSubscription.companyName}
            dialogClose={dialogClose}
          />
        </TableContainer>
      )}

      <ConfirmationDialogue
        open={confirmationDialogOpen}
        handleClose={closeConfirmationDialog}
        handleConfirm={confirmDeleteCompany}
      />

      <Pagination
        count={Math.ceil(companies.data.length / rowsPerPage)}
        page={page}
        onChange={handleChangePage}
        sx={{ marginTop: 2, justifyContent: "center" }}
      />
    </Box>
  );
};

export default ListCompanies;
