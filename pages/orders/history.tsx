import { GetServerSideProps, NextPage } from "next";
import NextLink from "next/link";
import { Typography, Grid, Chip, Link } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid/models";
import { ShopLayout } from "../../components/layouts";
import { getSession } from "next-auth/react";
import { dbOrders } from "@/data";
import { IOrder } from "@/interfaces";

const column: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "fullname", headerName: "Nombre", width: 300 },
  {
    field: "paid",
    headerName: "Pagada",
    description: "Muestra si la orden ha sido pagada o no",
    width: 200,
    renderCell: (params: GridRenderCellParams) => {
      return params.row.paid ? (
        <Chip color="success" label="Pagada" variant="outlined" />
      ) : (
        <Chip color="error" label="No pagada" variant="outlined" />
      );
    },
  },
  {
    field: "link",
    headerName: "Ver orden",
    description: "Link que lleva a la orden",
    sortable: false,
    width: 200,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <NextLink href={`/orders/${params.row.orderid}`} passHref>
          <Link component="span" underline="hover">
            {params.row.orderid}
          </Link>
        </NextLink>
      );
    },
  },
];
// const row = [
//   { id: 1, paid: false, orderid: "12345", fullname: "Sebastian Madero" },
//   { id: 2, paid: true, orderid: "54321", fullname: "Maria Rodriguez" },
//   { id: 3, paid: true, orderid: "32312", fullname: "Carlos Gonzalez" },
//   { id: 4, paid: false, orderid: "89080", fullname: "Ana Lopez" },
//   { id: 5, paid: false, orderid: "09876", fullname: "Pedro Hernandez" },
//   { id: 6, paid: true, orderid: "67432", fullname: "Juan Perez" },
// ];

interface Props {
  orders: IOrder[];
}

const HistoryPage: NextPage<Props> = ({ orders }) => {
  const row = orders.map((order, i) => {
    return {
      id: i + 1,
      paid: order.isPaid,
      orderid: order._id,
      fullname: `${order.shippingAddress.name} ${order.shippingAddress.lastName}`,
    };
  });
  return (
    <ShopLayout
      title={"Historial de ordenes"}
      pageDesc={"Historial de ordenes del cliente"}
    >
      <Typography variant="h1" component="h1" mb={2}>
        Historial de ordenes
      </Typography>

      <Grid container className="fadeIn">
        <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
          <DataGrid rows={row} columns={column} pageSizeOptions={[100]} />
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session: any = await getSession({ req });
  const userId = session.user._id || session.user.id;
  if (!session) {
    return {
      redirect: {
        destination: "/auth/login?p=/orders/history",
        permanent: false,
      },
    };
  }

  const orders = await dbOrders.getOrderByUser(userId);

  return {
    props: {
      orders,
    },
  };
};
export default HistoryPage;
