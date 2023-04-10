import { Chip, Grid, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { ConfirmationNumberOutlined } from "@mui/icons-material";
import { AdminLayout } from "@/components/layouts";
import useSWR from "swr";
import { IOrder, IUser } from "@/interfaces";
import { FullScreenLoading } from "@/components/ui";
import { currency, date } from "@/utils";

const columns: GridColDef[] = [
  { field: "id", headerName: "Orden ID", width: 250 },
  { field: "email", headerName: "Correo", width: 250 },
  { field: "name", headerName: "Nombre del usuario", width: 300 },
  { field: "total", headerName: "Monto total", width: 300 },
  { field: "dolarTotal", headerName: "Monto en dolares", width: 300 },
  {
    field: "isPaid",
    headerName: "Pagada",
    renderCell: ({ row }: GridRenderCellParams) => {
      return row.isPaid ? (
        <Chip variant="outlined" label="Pagada" color="success" />
      ) : (
        <Chip variant="outlined" label="Pendiente" color="error" />
      );
    },
  },
  {
    field: "noOfProducts",
    headerName: "No.Productos",
    align: "center",
    width: 150,
  },
  {
    field: "check",
    headerName: "Ver orden",
    renderCell: ({ row }: GridRenderCellParams) => {
      return (
        <a
          style={{ color: "#0535f5" }}
          href={`/admin/orders/${row.id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Ver orden
        </a>
      );
    },
  },
  { field: "createdAt", headerName: "Creada en:", align: "center", width: 300 },
];

const OrdersAdminPage = () => {
  const { data, error } = useSWR<IOrder[]>("/api/admin/orders");
  if (!error && !data) {
    return <FullScreenLoading />;
  }
  if (error) {
    console.log(error);
    return <Typography>Error al cargar la información</Typography>;
  }

  const rows = data!.map((order) => ({
    id: order._id,
    email: (order.user as IUser).email,
    name: (order.user as IUser).name,
    total: currency.format(order.total),
    dolarTotal: order.dolarTotal,
    isPaid: order.isPaid,
    noOfProducts: order.numberOfItems,
    createdAt: date.formatDate(order.createdAt as string),
  }));
  return (
    <AdminLayout
      title="Ordenes"
      subtitle="Mantenimiento de ordenes"
      icon={<ConfirmationNumberOutlined />}
    >
      <Grid container className="fadeIn">
        <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
          <DataGrid rows={rows} columns={columns} pageSizeOptions={[100]} />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default OrdersAdminPage;
