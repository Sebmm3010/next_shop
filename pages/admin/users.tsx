import { useEffect, useState } from "react";
import useSWR from "swr";
import { PeopleOutline } from "@mui/icons-material";
import { MenuItem, Select, Typography } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { AdminLayout } from "@/components/layouts";
import { DataTable, FullScreenLoading } from "@/components/ui";
import { nextShopApi } from "@/apis";
import { IUser } from "@/interfaces";

const UsersPage = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const { data, error } = useSWR<IUser[]>("/api/admin/users");

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);

  if (!error && !data) {
    return <FullScreenLoading />;
  }
  if (error) {
    console.log(error);
    return <Typography>Error al cargar la información</Typography>;
  }

  const onRoleUpdated = async (userId: string, newRole: string) => {
    const previosUsers = users.map((user) => ({ ...user }));
    const updatedUsers = users.map((user) => {
      const id = user._id || user.id;
      return {
        ...user,
        role: userId === id ? newRole : user.role,
      };
    });
    setUsers(updatedUsers);
    try {
      await nextShopApi.put("/admin/users", { userId, role: newRole });
    } catch (error) {
      setUsers(previosUsers);
      console.log(error);
      alert("No se pudo actualizar el role del usuario");
    }
  };

  const column: GridColDef[] = [
    { field: "email", headerName: "Correo", width: 250 },
    { field: "name", headerName: "Nombre", width: 300 },
    {
      field: "role",
      headerName: "Rol",
      width: 300,
      renderCell: ({ row }: GridRenderCellParams) => {
        return (
          <Select
            onChange={({ target }) => onRoleUpdated(row.id, target.value)}
            value={row.role}
            label="Rol"
            sx={{ width: "300px" }}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="client">Client</MenuItem>
            <MenuItem value="super-user">Super-user</MenuItem>
            <MenuItem value="CEO">CEO</MenuItem>
          </Select>
        );
      },
    },
  ];

  const row = users.map((user) => ({
    id: user._id || user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  }));

  return (
    <AdminLayout
      title={"Usuarios"}
      subtitle={"Mantenimiento de usuarios"}
      icon={<PeopleOutline />}
    >
      <DataTable rows={row} columns={column} />
    </AdminLayout>
  );
};

export default UsersPage;
