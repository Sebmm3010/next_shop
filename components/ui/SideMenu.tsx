import { useContext, useState } from "react";
import { useRouter } from "next/router";

import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Input,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  ListItemButton,
} from "@mui/material";
import {
  AccountCircleOutlined,
  AdminPanelSettings,
  CategoryOutlined,
  ConfirmationNumberOutlined,
  EscalatorWarningOutlined,
  FemaleOutlined,
  LoginOutlined,
  MaleOutlined,
  SearchOutlined,
  VpnKeyOutlined,
} from "@mui/icons-material";

import { AuthContext, UiContext } from "@/context";
import { AdminPanel } from "./";

export const SideMenu = () => {
  const [searchInput, setSearchInput] = useState("");

  const { isSideMenuOpen, toogleSideMenu } = useContext(UiContext);
  const { user, isLogged } = useContext(AuthContext);
  const router = useRouter();

  const navigate = (url: string) => {
    router.push(url);
    toogleSideMenu();
  };

  const onSearch = () => {
    if (searchInput.trim().length === 0) return;
    setSearchInput("");
    navigate(`/search/${searchInput}`);
  };

  return (
    <Drawer
      open={isSideMenuOpen}
      anchor="right"
      sx={{ backdropFilter: "blur(4px)", transition: "all 0.5s ease-out" }}
      onClose={() => {
        toogleSideMenu();
        setSearchInput("");
      }}
    >
      <Box sx={{ width: 250, paddingTop: 5 }}>
        <List>
          <ListItem sx={{ display: { xs: "block", sm: "none" } }}>
            <Input
              autoFocus
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onSearch()}
              type="text"
              placeholder="Buscar..."
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={onSearch}>
                    <SearchOutlined />
                  </IconButton>
                </InputAdornment>
              }
            />
          </ListItem>
          {/* Botones para Usuario logeado */}
          {isLogged ? (
            <>
              <ListItemButton>
                <ListItemIcon>
                  <AccountCircleOutlined />
                </ListItemIcon>
                <ListItemText primary={"Perfil"} />
              </ListItemButton>

              <ListItemButton>
                <ListItemIcon>
                  <ConfirmationNumberOutlined />
                </ListItemIcon>
                <ListItemText primary={"Mis Ordenes"} />
              </ListItemButton>
            </>
          ) : null}

          {/* Botones de navegacion para moviles */}
          <ListItemButton
            sx={{ display: { xs: "", sm: "none" } }}
            onClick={() => navigate("/category/men")}
          >
            <ListItemIcon>
              <MaleOutlined />
            </ListItemIcon>
            <ListItemText primary={"Hombres"} />
          </ListItemButton>

          <ListItemButton
            sx={{ display: { xs: "", sm: "none" } }}
            onClick={() => navigate("/category/women")}
          >
            <ListItemIcon>
              <FemaleOutlined />
            </ListItemIcon>
            <ListItemText primary={"Mujeres"} />
          </ListItemButton>

          <ListItemButton
            sx={{ display: { xs: "", sm: "none" } }}
            onClick={() => navigate("/category/kids")}
          >
            <ListItemIcon>
              <EscalatorWarningOutlined />
            </ListItemIcon>
            <ListItemText primary={"Niños"} />
          </ListItemButton>

          {/* Salir e ingresar */}
          {isLogged ? (
            <ListItemButton>
              <ListItemIcon>
                <LoginOutlined />
              </ListItemIcon>
              <ListItemText primary={"Salir"} />
            </ListItemButton>
          ) : (
            <ListItemButton onClick={() => navigate("/auth/login")}>
              <ListItemIcon>
                <VpnKeyOutlined />
              </ListItemIcon>
              <ListItemText primary={"Ingresar"} />
            </ListItemButton>
          )}

          {/* Admin */}
          <Divider />
          {user?.role === "admin" ? (
            <AdminPanel/>
          ) : null}
        </List>
      </Box>
    </Drawer>
  );
};
