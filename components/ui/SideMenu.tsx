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
  ListItemButton,
} from "@mui/material";
import {
  AccountCircleOutlined,
  ConfirmationNumberOutlined,
  EscalatorWarningOutlined,
  FemaleOutlined,
  LoginOutlined,
  MaleOutlined,
  SearchOutlined,
  VpnKeyOutlined,
} from "@mui/icons-material";

import { AuthContext, UiContext } from "@/context";
import { AdminPanel } from "../admin";

export const SideMenu = () => {
  const [searchInput, setSearchInput] = useState("");

  const { isSideMenuOpen, toogleSideMenu } = useContext(UiContext);
  const { user, isLogged, logoutUser } = useContext(AuthContext);
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
                <ListItemText primary={user?.name} />
              </ListItemButton>

              <ListItemButton onClick={() => navigate("/orders/history")}>
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
            <ListItemButton onClick={logoutUser}>
              <ListItemIcon>
                <LoginOutlined />
              </ListItemIcon>
              <ListItemText primary={"Salir"} />
            </ListItemButton>
          ) : (
            <ListItemButton
              onClick={() => navigate(`/auth/login?p=${router.asPath}`)}
            >
              <ListItemIcon>
                <VpnKeyOutlined />
              </ListItemIcon>
              <ListItemText primary={"Ingresar"} />
            </ListItemButton>
          )}

          {/* Admin */}
          <Divider />
          {user?.role === "admin" ? <AdminPanel navigate={navigate} /> : null}
        </List>
      </Box>
    </Drawer>
  );
};
