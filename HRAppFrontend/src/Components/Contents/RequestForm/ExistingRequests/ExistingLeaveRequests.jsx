import {
  Alert,
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  Collapse,
  Divider,
  Fade,
  IconButton,
  Pagination,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  styled,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import {
  AllInclusive as AllInclusiveIcon,
  Cancel as CancelIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
  HourglassEmpty as HourglassEmptyIcon,
} from "@mui/icons-material";

import {
  Cancel,
  CheckCircle,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
import { green, grey, orange, red } from "@mui/material/colors";
import { toast } from "react-toastify";
import { deleteLeave } from "../../../../Services/apis/EmployeeOperations/LeaveOperations";

const StyledCard = styled(Card)({
  borderRadius: "16px",
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
  overflow: "hidden",
});

const StyledCardContent = styled(CardContent)({
  padding: "20px",
});

const RequestHeader = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "10px",
});

const RequestDetails = styled("div")({
  marginTop: "20px",
});

const StatusAlert = styled(Alert)(({ theme, status }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(2),
  padding: theme.spacing(1),
  "& .MuiAlert-icon": {
    marginRight: theme.spacing(1),
  },
  "&.approved": {
    backgroundColor: theme.palette.success.main,
  },
  "&.declined": {
    backgroundColor: theme.palette.error.main,
  },
}));

const StatusBadge = styled(Badge)(({ theme, status }) => ({
  backgroundColor:
    status === "Waiting"
      ? orange[500]
      : status === "Approved"
      ? green[500]
      : status === "Denied"
      ? red[500]
      : grey[500],
  borderRadius: "50%",
  padding: "8px",
  marginRight: theme.spacing(1),
  boxShadow: `0 0 10px rgba(0, 0, 0, 0.1)`,
}));

const ExpandIcon = styled(ExpandMoreIcon)({
  transition: "transform 0.3s ease",
});

const StyledIconButton = styled(IconButton)({
  transform: "rotate(180deg)",
  marginLeft: "auto",
  transition: "transform 0.3s ease",
});

const CoolUpdateButton = styled(Button)({
  backgroundColor: "card.backgroundSecondary",
  color: "text.primary",
  "&:hover": {
    backgroundColor: "card.backgroundMain",
  },
});

const ExistingLeaveRequests = ({ datas, updateRequest }) => {
  const [existingRequests, setExistingRequests] = useState([]);
  const [expandedItem, setExpandedItem] = useState(null);
  const [filterStatus, setFilterStatus] = useState("Waiting");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    setExistingRequests(datas);
  }, [datas]);

  const handleExpandClick = (id) => {
    setExpandedItem((prev) => (prev === id ? null : id));
  };

  const handleFilterStatusChange = (event, newFilterStatus) => {
    setFilterStatus(newFilterStatus);
    setCurrentPage(1);
  };

  const cancelRequest = (id) => {
    deleteLeave(id, (message, error) => {
      if (message) {
        toast.success("Avans talebi silinmiştir.");
        setExistingRequests((prev) =>
          prev.filter((item) => item.leaveID !== id)
        );
      } else if (error) {
        toast.error(error);
      } else {
        toast.warning(
          "Silme işlemi yaparken hata ile karşılaşıldı. Lütfen tekrar deneyiniz."
        );
      }
    });
  };

  const LeaveTypeconvert = (type) =>{
    switch (type) {
      case "YillikIzin":
        return "Yıllık izin"
      case "UcretsizIzin":
        return "Ücretsiz izin"
      case "MazeretIzni":
        return "Mazeret izini"
      case "RaporluIzin":
        return "Raporlu"
      case "OzelIzin":
        return "Özel izin"
      case "DogumIzni":
        return "Doğum izini"
      case "EvlilikIzni":
        return "Evlilik izni"
      case "OlumIzni":
        return "Ölüm izini"
    }
  }

  const filteredRequests = existingRequests.filter(
    (request) =>
      filterStatus === "All" || request.approvalStatus === filterStatus
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRequests.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Box sx={{ marginTop: 2 }}>
      <StyledCard elevation={5}>
        <StyledCardContent>
          <Typography variant="h2" sx={{ marginBottom: 2, fontSize: "1rem" }}>
            Geçmiş Talepleriniz
          </Typography>
          <ToggleButtonGroup
            value={filterStatus}
            exclusive
            onChange={handleFilterStatusChange}
            sx={{ marginBottom: 1 }}
          >
            <ToggleButton value="All" size="small">
              <AllInclusiveIcon sx={{ marginRight: 0.5 }} />
              Tümü
            </ToggleButton>
            <ToggleButton value="Waiting" size="small">
              <HourglassEmptyIcon sx={{ marginRight: 0.5 }} />
              Onay Bekliyor
            </ToggleButton>
            <ToggleButton value="Approved" size="small">
              <CheckCircleOutlineIcon sx={{ marginRight: 0.5 }} />
              Onaylandı
            </ToggleButton>
            <ToggleButton value="Denied" size="small">
              <CancelIcon sx={{ marginRight: 0.5 }} />
              Reddedildi
            </ToggleButton>
          </ToggleButtonGroup>
          {currentItems.map((request) => (
            <Fade in key={request.id}>
              <Box
                sx={{
                  border: "1px solid #ddd",
                  borderRadius: "16px",
                  padding: "8px",
                  marginBottom: "16px",
                  transition: "box-shadow 0.5s ease",
                  "&:hover": {
                    boxShadow: "0 0 10px rgba(0, 0, 8, 0.5)",
                  },
                }}
              >
                <RequestHeader>
                  <Box>
                    <Typography variant="subtitle1">
                      <StatusBadge
                        color="primary"
                        status={request.approvalStatus}
                        overlap="circular"
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                      />
                      {request.approvalStatus === "Waiting" && (
                        <span>Durum: Beklemede</span>
                      )}
                      {request.approvalStatus === "Approved" && (
                        <span>Durum: Onaylandı</span>
                      )}
                      {request.approvalStatus === "Denied" && (
                        <span>Durum: Reddedildi</span>
                      )}
                      <Typography
                        variant="body2"
                        color="text.primary"
                        sx={{ marginLeft: 1 }}
                      >
                        {request.status}
                      </Typography>
                    </Typography>
                      <Typography color="text.primary">
                        {LeaveTypeconvert(request.type)}
                      </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <StyledIconButton
                      size="small"
                      onClick={() => handleExpandClick(request.leaveID)}
                    >
                      <ExpandIcon
                        style={{
                          transform:
                            expandedItem === request.leaveID
                              ? "rotate(180deg)"
                              : "rotate(0deg)",
                        }}
                      />
                    </StyledIconButton>
                  </Box>
                </RequestHeader>

                <Collapse
                  in={expandedItem === request.leaveID}
                  timeout="auto"
                  unmountOnExit
                >
                  <RequestDetails>
                    {request.status === "Onaylandı" && (
                      <StatusAlert severity="success" className="approved">
                        <CheckCircle />
                        Onaylandı
                      </StatusAlert>
                    )}
                    {request.status === "Reddedildi" && (
                      <StatusAlert severity="error" className="declined">
                        <Cancel />
                        Reddedildi
                      </StatusAlert>
                    )}
                    <Typography>
                      <b>Tarihler:</b>{" "}
                      {request.leaveDate.split("T")[0] +
                        "-" +
                        request.dueDate.split("T")[0]}
                    </Typography>
                    <Typography>
                      <b>Açıklama:</b> {request.description}
                    </Typography>
                    <Divider sx={{ marginY: 2 }} />

                    {request.approvalStatus === "Waiting" && (
                      <Box sx={{ display: "flex", justifyContent: "left" }}>
                        <CoolUpdateButton
                          color="success"
                          variant="outlined"
                          onClick={() => updateRequest(request.leaveID)}
                        >
                          Talebi Güncelle
                        </CoolUpdateButton>
                        <Box sx={{ width: "8px" }} />
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => cancelRequest(request.leaveID)}
                        >
                          Talebi İptal Et
                        </Button>
                      </Box>
                    )}
                  </RequestDetails>
                </Collapse>
              </Box>
            </Fade>
          ))}

          {filteredRequests.length === 0 && (
            <Typography variant="body2" color="text.secondary">
              Filtrelenmiş talep bulunmamaktadır.
            </Typography>
          )}

          <Box sx={{ marginTop: 2 }}>
            <Pagination
              count={Math.ceil(filteredRequests.length / itemsPerPage)}
              page={currentPage}
              onChange={(event, page) => paginate(page)}
            />
          </Box>
        </StyledCardContent>
      </StyledCard>
    </Box>
  );
};

export default ExistingLeaveRequests;
