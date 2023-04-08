import { Grid } from "@mui/material";
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

import { AdminSummary, PropsSummary } from "@/components/admin";
import { AdminLayout } from "@/components/layouts";

const summaryTile: PropsSummary[] = [
  {
    title: 1,
    subTitle: "Ordenes totales",
    icon: <CreditCardOffOutlined color="secondary" sx={{ fontSize: 40 }} />,
  },
  {
    title: 2,
    subTitle: "Ordenes pagadas",
    icon: <AttachMoneyOutlined color="success" sx={{ fontSize: 40 }} />,
  },
  {
    title: 3,
    subTitle: "Ordenes pendientes",
    icon: <CreditCardOffOutlined color="error" sx={{ fontSize: 40 }} />,
  },
  {
    title: 4,
    subTitle: "Clientes",
    icon: <GroupOutlined color="primary" sx={{ fontSize: 40 }} />,
  },
  {
    title: 5,
    subTitle: "Productos",
    icon: <CategoryOutlined color="warning" sx={{ fontSize: 40 }} />,
  },
  {
    title: 6,
    subTitle: "Sin existencia",
    icon: <CancelPresentationOutlined color="error" sx={{ fontSize: 40 }} />,
  },
  {
    title: 7,
    subTitle: "Proximos a terminar",
    icon: (
      <ProductionQuantityLimitsOutlined color="warning" sx={{ fontSize: 40 }} />
    ),
  },
  {
    title: 8,
    subTitle: "Actualizacion en:",
    icon: <AccessTimeOutlined color="secondary" sx={{ fontSize: 40 }} />,
  },
];

const AdminDashboradPage = () => {
  return (
    <AdminLayout
      title="DashBoard"
      subtitle="Estadisticas generales"
      icon={<DashboardOutlined />}
    >
      <Grid container spacing={2}>
        {summaryTile.map(({ title, subTitle, icon }) => (
          <AdminSummary
            key={title}
            title={title}
            subTitle={subTitle}
            icon={icon}
          />
        ))}
      </Grid>
    </AdminLayout>
  );
};

export default AdminDashboradPage;
