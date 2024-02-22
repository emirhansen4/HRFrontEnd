import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SortIcon from "@mui/icons-material/Sort";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getEmployees } from "../../../Services/apis/employeeService";

const PersonnelList = () => {
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortBy, setSortBy] = useState("name");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees);
  console.log(employees.data);
  useEffect(() => {
    dispatch(getEmployees())
      .then(() => setLoading(false))
      .catch((error) => {
        console.error("Error fetching employees:", error);
        setLoading(false);
      });
  }, [dispatch]);

  const filteredPersonnel = employees.data.filter((person) => {
    const nameMatch = `${person.firstName} ${person.lastName}`.toLowerCase().includes(search.toLowerCase());
    if (filter === "all") return nameMatch;
    return nameMatch && (filter === "active" ? person.status === "Active" : person.status !== "Active");
  });

  const sortedPersonnel = [...filteredPersonnel].sort((a, b) => {
    const compareValue = (valueA, valueB) => valueA.localeCompare(valueB);

    const getValue = (person) => {
      switch (sortBy) {
        case "name": return `${person.firstName} ${person.lastName}`;
        case "departman": return person.departmentName;
        case "pozisyon": return person.profession;
        case "email": return person.email;
        case "phone": return person.phoneNumber;
        default: return "";
      }
    };

    return sortOrder === "asc" ? compareValue(getValue(a), getValue(b)) : compareValue(getValue(b), getValue(a));
  });

  const handleViewDetails = (id) => navigate(`/personnelList/personalDetails/${id}`);
  const handleEdit = (id) => navigate(`/personnelList/personalEdit/${id}`);
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleSort = (field) => (field === sortBy) ? setSortOrder(sortOrder === "asc" ? "desc" : "asc") : (setSortBy(field), setSortOrder("asc"));

  return (
    <Box sx={{ margin: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2,  }}>
        <TextField
          label="İsme Göre Ara"
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonSearchIcon  />
              </InputAdornment>
            ),
          }}
          sx={{ width: 200, marginRight: 2 }}
        />
        <ToggleButtonGroup
          value={filter}
          exclusive
          onChange={(e, newFilter) => setFilter(newFilter)}
          aria-label="Personeli filtrele"
        >
          {["all", "active", "passive"].map((value) => (
            <ToggleButton key={value} value={value} aria-label={value}>
              {value === "all" ? "Tümü" : value === "active" ? "Aktif" : "Pasif"}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "300px" }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer sx={{ backgroundColor: "card.primary" , transition: "all 0.5s ease-in-out" }}>
          <Table>
            <TableHead>
              <TableRow>
                {["name", "status", "departman", "pozisyon", "email", "phone"].map((field) => (
                  <TableCell key={field}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography variant="h6">{field === "name" ? "İsim" : field === "departman" ? "Departman" : field === "pozisyon" ? "Pozisyon" : field.charAt(0).toUpperCase() + field.slice(1)}</Typography>
                      <IconButton onClick={() => handleSort(field)} size="small" sx={{ ml: 1 }}>
                        <SortIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                ))}
                <TableCell>
                  <Typography variant="h6">İşlem</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedPersonnel.slice((page - 1) * rowsPerPage, page * rowsPerPage).map((person) => (
                <TableRow key={person.id}>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar alt="Kullanıcı Avatarı" src={person.filePath || "default-avatar-url"} sx={{ width: 40, height: 40, marginRight: 1 }} />
                      <Typography variant="body1">{`${person.firstName} ${person.lastName}`}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">{person.status === "Active" ? "Aktif" : "Pasif"}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">{person.departmentName}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">{person.profession}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">{person.email}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">
                      {person.phoneNumber.length < 9 ? "-" : person.phoneNumber}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Tooltip title="Detayları Görüntüle">
                        <Button variant="contained" color="info" size="medium" onClick={() => handleViewDetails(person.employeeId)} sx={{ marginRight: 1 }}>
                          <VisibilityIcon />
                        </Button>
                      </Tooltip>
                      <Tooltip title="Düzenle">
                        <Button variant="contained" color="primary" startIcon={<EditIcon />} size="medium" onClick={() => handleEdit(person.employeeId)}>
                          Düzenle
                        </Button>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Pagination
        count={Math.ceil(sortedPersonnel.length / rowsPerPage)}
        page={page}
        onChange={handleChangePage}
        sx={{ marginTop: 2, justifyContent: "center" }}
      />
    </Box>
  );
};

export default PersonnelList;
