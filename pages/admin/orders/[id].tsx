import { GetServerSideProps, NextPage } from "next";
import { CartList, CartOrderSummary } from "@/components/cart";
import { ShopLayout } from "@/components/layouts";
import { IOrder } from "@/interfaces";
import { countries } from "@/utils";
import {
  CreditCardOffOutlined,
  CreditScoreOutlined,
} from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { dbOrders } from "@/data";

interface Props {
  order: IOrder;
}

const OrderAdminPage: NextPage<Props> = ({ order }) => {
  return (
    <ShopLayout title={"Resumen de la orden"} pageDesc={"Resumen de la orden"}>
      <Typography variant="h1" component="h1">
        Orden: {order._id}
      </Typography>

      {order.isPaid ? (
        <Chip
          sx={{ my: 2 }}
          label="Orden pagada"
          variant="outlined"
          color="success"
          icon={<CreditScoreOutlined />}
        />
      ) : (
        <Chip
          sx={{ my: 2 }}
          label="pendiente de pago"
          variant="outlined"
          color="error"
          icon={<CreditCardOffOutlined />}
        />
      )}

      <Grid container className="fadeIn">
        <Grid item xs={12} sm={7}>
          <CartList editable={false} products={order.orderItems} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2" component="h2">
                Resumen({order.numberOfItems} productos)
              </Typography>
              <Divider sx={{ my: 1 }} />

              <Typography variant="subtitle1">Direccion de entrega</Typography>
              <Typography>
                {order.shippingAddress.name} {order.shippingAddress.lastName}
              </Typography>
              <Typography>{order.shippingAddress.address1}</Typography>
              {order.shippingAddress.address2 ? (
                <Typography>{order.shippingAddress.address2}</Typography>
              ) : null}
              <Typography>{order.shippingAddress.city}</Typography>
              <Typography>{order.shippingAddress.postalCode}</Typography>

              <Typography>
                {
                  countries.find(
                    (c) => c.code === order.shippingAddress.country
                  )?.name
                }
              </Typography>
              <Typography>{order.shippingAddress.phone}</Typography>

              <Divider sx={{ my: 1 }} />
              <CartOrderSummary
                data={{
                  numberOfItems: order.numberOfItems,
                  subTotal: order.subTotal,
                  iva: order.iva,
                  total: order.total,
                }}
              />

              <Box sx={{ mt: 3 }} display="flex" flexDirection="column">
                {order.isPaid ? (
                  <Chip
                    sx={{ my: 2 }}
                    label="Orden pagada"
                    variant="outlined"
                    color="success"
                    icon={<CreditScoreOutlined />}
                  />
                ) : (
                  <Chip
                    sx={{ my: 2 }}
                    label="Orden pendiente"
                    variant="outlined"
                    color="error"
                    icon={<CreditCardOffOutlined />}
                  />
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const { id = "" } = query;
  const order = await dbOrders.getOrderById(id.toString());

  if (!order) {
    return {
      redirect: {
        destination: "/admin/orders",
        permanent: false,
      },
    };
  }

  return {
    props: {
      order,
    },
  };
};

export default OrderAdminPage;
