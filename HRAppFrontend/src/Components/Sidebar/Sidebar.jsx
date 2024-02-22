import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import Tooltip from "@mui/material/Tooltip";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";
import ListIcon from "@mui/icons-material/List";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import { useNavigate, useLocation } from "react-router-dom";
import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import { decode } from "../../Services/JwtDecoder";
import ChecklistIcon from "@mui/icons-material/Checklist";
import RequestPageIcon from "@mui/icons-material/RequestPage";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import BusinessIcon from "@mui/icons-material/Business";

export const Sidebar = () => {
  const [isOwner, setIsOwner] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = React.useState(true);
  const [nestedOpen, setNestedOpen] = React.useState(false);

  React.useEffect(() => {
    const decodedRole = decode().currentRole;
    setIsAdmin(decodedRole === "Admin");
    setIsOwner(decodedRole === "SiteAdmin");
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setNestedOpen(false);
  };

  const toggleNestedList = (event) => {
    event.stopPropagation();
    setNestedOpen(!nestedOpen);
  };

  const isItemSelected = (path) => location.pathname === path;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? 240 : 80,
        flexShrink: 1,
        transition: "width 0.5s ease-in-out",
        [`& .MuiDrawer-paper`]: {},
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          overflowY: open ? "auto" : "hidden",
          marginTop: "64px",
          transition: "background 0.5s ease-in-out",
        }}
      >
        <Toolbar>
          <Tooltip title={open ? "Gizle" : "Genişlet"} placement="right">
            <IconButton
              color="inherit"
              aria-label={open ? "close drawer" : "open drawer"}
              onClick={open ? handleDrawerClose : handleDrawerOpen}
              edge="start"
            >
              {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </Tooltip>
          <ListItemText
            primary={open ? "Gizle" : "Genişlet"}
            sx={{ marginLeft: "10px", display: open ? "block" : "none" }}
          />
        </Toolbar>
        <List>
          <ListItem
            key="home"
            disablePadding
            selected={isItemSelected("/home")}
            onClick={() => navigate("/home")}
          >
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText
                primary="Anasayfa"
                sx={{ display: open ? "flex" : "none" }}
              />
            </ListItemButton>
          </ListItem>

          {!isOwner && (
          <ListItem
            key="profile"
            disablePadding
            selected={isItemSelected("/profile")}
            onClick={() => navigate("/profile")}
          >
            <ListItemButton>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText
                primary="Profil"
                sx={{ display: open ? "flex" : "none" }}
              />
            </ListItemButton>
          </ListItem>
          )}
          {!isAdmin && !isOwner &&(
          <ListItem
                  key="request"
                  disablePadding
                  selected={isItemSelected("/request")}
                  onClick={() => navigate("/request")}
                >
                  <ListItemButton>
                    <ListItemIcon>
                      <RequestPageIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="İstek Gönder"
                      sx={{ display: open ? "flex" : "none" }}
                    />
                  </ListItemButton>
                </ListItem>
                )}

{isAdmin ? ( <ListItem
            key="request"
            disablePadding
            selected={isItemSelected("/requestView")}
            onClick={() => navigate("/requestView")}
          >
            <ListItemButton>
              <ListItemIcon>
                <ChecklistIcon />
              </ListItemIcon>
              <ListItemText
                primary="İstekleri Görüntüle"
                sx={{ display: open ? "flex" : "none" }}
              />
            </ListItemButton>
          </ListItem>
          ) : null}
          
          <ListItem
            disablePadding
            sx={{ flexDirection: "column" }}
            onClick={open ? toggleNestedList : handleDrawerOpen}
          >
            {isAdmin ? (
              <>
                
                <ListItemButton>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>

                  <ListItemText
                    primary="Personel İşlemleri"
                    sx={{ display: open ? "flex" : "none" }}
                  />

                  {nestedOpen ? (
                    <ExpandLessIcon sx={{ display: open ? "flex" : "none" }} />
                  ) : (
                    <ExpandMoreIcon sx={{ display: open ? "flex" : "none" }} />
                  )}
                </ListItemButton>
              </>
            ) : null}
            {open && (
              <Collapse in={nestedOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem
                    key="addPersonal"
                    disablePadding
                    selected={isItemSelected("/addPersonal")}
                    onClick={() => navigate("/addPersonal")}
                  >
                    <ListItemButton sx={{ pl: 4, flexDirection: "column" }}>
                      <div style={{ display: "flex", alignItems: "left" }}>
                        {open && (
                          <ListItemIcon>
                            <AddIcon />
                          </ListItemIcon>
                        )}
                        {nestedOpen && (
                          <ListItemText primary="Personel Ekleme" />
                        )}
                      </div>
                    </ListItemButton>
                  </ListItem>
                  <ListItem
                    key="personnelList"
                    disablePadding
                    selected={isItemSelected("/personnelList")}
                    onClick={() => navigate("/personnelList")}
                  >
                    <ListItemButton sx={{ pl: 4, flexDirection: "column" }}>
                      <div style={{ display: "flex", alignItems: "left" }}>
                        {open && (
                          <ListItemIcon>
                            <ListIcon />
                          </ListItemIcon>
                        )}
                        {nestedOpen && (
                          <ListItemText primary="Personel Listesi" />
                        )}
                      </div>
                    </ListItemButton>
                  </ListItem>
                </List>
              </Collapse>
            )}
          </ListItem>
          {isOwner && (
            <>
          <ListItem
            key="ListComanies"
            disablePadding
            selected={isItemSelected("/listCompanies")}
            onClick={() => navigate("/listCompanies")}
          >
            <ListItemButton>
              <ListItemIcon>
                <BusinessIcon  />
              </ListItemIcon>
              <ListItemText
                primary="Şirketleri Görüntüle"
                sx={{ display: open ? "flex" : "none" }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem
            key="addCompany"
            disablePadding
            selected={isItemSelected("/addCompany")}
            onClick={() => navigate("/addCompany")}
          >
            <ListItemButton>
              <ListItemIcon>
                <AddBusinessIcon />
              </ListItemIcon>
              <ListItemText
                primary="Şirket Ekle"
                sx={{ display: open ? "flex" : "none" }}
              />
            </ListItemButton>
          </ListItem>
          </>
          )}
        </List>
        <List sx={{ marginTop: "auto" }}>
          <ListItem
            key="settings"
            disablePadding
            selected={isItemSelected("/settings")}
            onClick={() => navigate("/settings")}
          >
            <ListItemButton>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText
                primary="Ayarlar"
                sx={{ display: open ? "flex" : "none" }}
              />
            </ListItemButton>
          </ListItem>
          {!isOwner && (
          <ListItem
            key="contact"
            disablePadding
            selected={isItemSelected("/contact")}
            onClick={() => navigate("/contact")}
          >
            <ListItemButton>
              <ListItemIcon>
                <EmailIcon />
              </ListItemIcon>
              <ListItemText
                primary="İletişim"
                sx={{ display: open ? "flex" : "none" }}
              />
            </ListItemButton>
          </ListItem>
          )}
          <ListItem
            key="logout"
            disablePadding
            onClick={() => navigate("/login")}
          >
            <ListItemButton>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText
                primary="Çıkış"
                sx={{ display: open ? "flex" : "none" }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};
