import useSWR from "swr";
import { Grid, Typography } from "@mui/material";
import {
  AccessTimeOutlined,
  AttachMoneyOutlined,
  CancelPresentationOutlined,
  CategoryOutlined,
  CreditCardOffOutlined,
  DashboardOutlined,
  GroupOutlined,
  ProductionQuantityLimitsOutlined,
} from "@mui/icons-material";

import { AdminSummary } from "@/components/admin";
import { AdminLayout } from "@/components/layouts";
import { DashboradSummaryRes } from "@/interfaces";
import { FullScreenLoading } from "@/components/ui";
import { useEffect, useState } from "react";

const AdminDashboradPage = () => {
  const { data, error } = useSWR<DashboradSummaryRes>("/api/admin/dashboard", {
    refreshInterval: 30 * 1000, //30 segs
  });

  const [refreshIn, setRefreshIn] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshIn((refreshIn) => (refreshIn > 0 ? refreshIn - 1 : 30));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!error && !data) {
    return <FullScreenLoading />;
  }
  if (error) {
    console.log(error);
    return <Typography>Error al cargar la información</Typography>;
  }

  const {
    numberOfOrders,
    paidOrders,
    notPaidOrders,
    numberOfClients,
    numberOfProducts,
    productWithNoInvetory,
    lowInventory,
  } = data;
  return (
    <AdminLayout
      title="DashBoard"
      subtitle="Estadisticas generales"
      icon={<DashboardOutlined />}
    >
      <Grid container spacing={2}>
        <AdminSummary
          title={numberOfOrders}
          subTitle="Ordenes totales"
          icon={
            <CreditCardOffOutlined color="secondary" sx={{ fontSize: 40 }} />
          }
        />
        <AdminSummary
          title={paidOrders}
          subTitle="Ordenes pagadas"
          icon={<AttachMoneyOutlined color="success" sx={{ fontSize: 40 }} />}
        />
        <AdminSummary
          title={notPaidOrders}
          subTitle="Ordenes pendientes"
          icon={<CreditCardOffOutlined color="error" sx={{ fontSize: 40 }} />}
        />
        <AdminSummary
          title={numberOfClients}
          subTitle="Cliente"
          icon={<GroupOutlined color="primary" sx={{ fontSize: 40 }} />}
        />
        <AdminSummary
          title={numberOfProducts}
          subTitle="Productos"
          icon={<CategoryOutlined color="warning" sx={{ fontSize: 40 }} />}
        />
        <AdminSummary
          title={productWithNoInvetory}
          subTitle="Sin existencia"
          icon={
            <CancelPresentationOutlined color="error" sx={{ fontSize: 40 }} />
          }
        />
        <AdminSummary
          title={lowInventory}
          subTitle="Proximos a terminar"
          icon={
            <ProductionQuantityLimitsOutlined
              color="warning"
              sx={{ fontSize: 40 }}
            />
          }
        />

        <AdminSummary
          title={refreshIn}
          subTitle="Actualizacion en "
          icon={<AccessTimeOutlined color="secondary" sx={{ fontSize: 40 }} />}
        />
      </Grid>
    </AdminLayout>
  );
};

export default AdminDashboradPage;
