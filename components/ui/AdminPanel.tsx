import {
  AdminPanelSettings,
  CategoryOutlined,
  ConfirmationNumberOutlined,
} from "@mui/icons-material";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import React from "react";

export const AdminPanel = () => {
  return (
    <>
      <ListSubheader>Admin Panel</ListSubheader>

      <ListItemButton>
        <ListItemIcon>
          <CategoryOutlined />
        </ListItemIcon>
        <ListItemText primary={"Productos"} />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <ConfirmationNumberOutlined />
        </ListItemIcon>
        <ListItemText primary={"Ordenes"} />
      </ListItemButton>

      <ListItemButton>
        <ListItemIcon>
          <AdminPanelSettings />
        </ListItemIcon>
        <ListItemText primary={"Usuarios"} />
      </ListItemButton>
    </>
  );
};