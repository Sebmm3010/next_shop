import useSWR from "swr";
import { PeopleOutline } from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { AdminLayout } from "@/components/layouts";
import { FullScreenLoading } from "@/components/ui";
import { IUser } from "@/interfaces";

const UsersPage = () => {
  const { data, error } = useSWR<IUser[]>("/api/admin/users");

  if (!error && !data) {
    return <FullScreenLoading />;
  }
  if (error) {
    console.log(error);
    return <Typography>Error al cargar la información</Typography>;
  }

  const column: GridColDef[] = [
    { field: "email", headerName: "Correo", width: 250 },
    { field: "name", headerName: "Nombre", width: 300 },
    { field: "role", headerName: "Rol", width: 300 },
  ];

  const rows = data!.map((user) => ({
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
      <Grid container className="fadeIn">
        <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
          <DataGrid rows={rows} columns={column} pageSizeOptions={[100]} />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default UsersPage;
