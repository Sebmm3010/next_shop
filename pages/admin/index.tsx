import { AdminLayout } from "@/components/layouts";
import { DashboardOutlined } from "@mui/icons-material";

const AdminDashboradPage = () => {
  return (
    <AdminLayout
      title="DashBoard"
      subtitle="Estadisticas generales"
      icon={<DashboardOutlined />}
    >
        <h3>Hola mubdi</h3>
    </AdminLayout>
  );
};

export default AdminDashboradPage;
