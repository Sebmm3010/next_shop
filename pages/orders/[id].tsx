import { useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { PayPalButtons } from "@paypal/react-paypal-js";

import {
  Grid,
  Typography,
  Card,
  CardContent,
  Divider,
  Box,
  Chip,
  CircularProgress,
} from "@mui/material";
import { CreditCardOffOutlined, CreditScoreOutlined } from "@mui/icons-material";
import { ShopLayout } from "@/components/layouts";
import { CartList, CartOrderSummary } from "@/components/cart";
import { dbOrders } from "@/data";
import { IOrder } from "@/interfaces";
import { countries } from "@/utils";
import { nextShopApi } from "@/api";

export type OrderResponseBody = {
  id: string;
  status:
    | "COMPLETED"
    | "SAVED"
    | "APPROVED"
    | "VOIDED"
    | "PAYER_ACTION_REQUIRED";
};

interface Props {
  order: IOrder;
}
const OrderPage: NextPage<Props> = ({ order }) => {
  const [isPaying, setIsPaying] = useState(false);
  const router = useRouter();

  const onOrderCompleted = async (detail: OrderResponseBody) => {
    if (detail.status !== "COMPLETED") {
      return alert("NO hay pago en paypal");
    }

    setIsPaying(true);
    try {
      const { data } = await nextShopApi.post(`/orders/pago`, {
        transactionId: detail.id,
        orderId: order._id,
      });
      router.reload();
    } catch (error) {
      setIsPaying(false);
      console.log(error);
      alert(error);
    }
  };

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
          color="warning"
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
                <Box
                  display="flex"
                  justifyContent="center"
                  className="fadeIn"
                  sx={{ display: isPaying ? "flex" : "none" }}
                >
                  <CircularProgress />
                </Box>

                <Box sx={{ display: isPaying ? "none" : "flex" }} flexDirection="column">
                  {order.isPaid ? (
                    <Chip
                      sx={{ my: 2 }}
                      label="Orden pagada"
                      variant="outlined"
                      color="success"
                      icon={<CreditScoreOutlined />}
                    />
                  ) : (
                    <PayPalButtons
                      createOrder={(data, actions) => {
                        return actions.order.create({
                          purchase_units: [
                            {
                              amount: {
                                value: `${order.dolarTotal}`,
                              },
                            },
                          ],
                        });
                      }}
                      onApprove={(data, actions) => {
                        return actions.order!.capture().then((details) => {
                          onOrderCompleted(details as OrderResponseBody);
                          // console.log({ details });
                          // const name = details.payer.name!.given_name;
                        });
                      }}
                    />
                  )}
                </Box>
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
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: `/auth/login?p=/orders/${id}`,
        permanent: false,
      },
    };
  }

  const order = await dbOrders.getOrderById(id.toString());

  if (!order) {
    return {
      redirect: {
        destination: "/orders/history",
        permanent: false,
      },
    };
  }
  const userId = session.user._id || session.user.id;
  if (order!.user !== userId) {
    return {
      redirect: {
        destination: "/orders/history",
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

export default OrderPage;
