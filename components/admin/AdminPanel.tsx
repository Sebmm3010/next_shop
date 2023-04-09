import { FC } from "react";
import {
  AdminPanelSettings,
  CategoryOutlined,
  ConfirmationNumberOutlined,
  DashboardOutlined,
} from "@mui/icons-material";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";

interface Props {
  navigate: (url: string) => void;
}

export const AdminPanel: FC<Props> = ({ navigate }) => {
  return (
    <>
      <ListSubheader>Admin Panel</ListSubheader>
      <ListItemButton onClick={() => navigate("/admin/")}>
        <ListItemIcon>
          <DashboardOutlined />
        </ListItemIcon>
        <ListItemText primary={"Dashboard"} />
      </ListItemButton>

      <ListItemButton onClick={() => navigate("/admin/users")}>
        <ListItemIcon>
          <AdminPanelSettings />
        </ListItemIcon>
        <ListItemText primary={"Usuarios"} />
      </ListItemButton>

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
    </>
  );
};
