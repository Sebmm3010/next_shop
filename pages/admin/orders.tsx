import { AdminLayout } from "@/components/layouts";
import { ConfirmationNumberOutlined } from "@mui/icons-material";
import React from "react";

const OrdersAdminPage = () => {
  return (
    <AdminLayout
      title="Ordenes"
      subtitle="Mantenimiento de ordenes"
      icon={<ConfirmationNumberOutlined />}
    >
        <h1>ordenes</h1>
    </AdminLayout>
  );
};

export default OrdersAdminPage;
