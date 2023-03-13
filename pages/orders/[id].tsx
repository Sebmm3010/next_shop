import NextLink from "next/link";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Divider,
  Box,
  Button,
  Link,
  Chip,
} from "@mui/material";
import { ShopLayout } from "@/components/layouts";
import { CartList, CartOrderSummary } from "@/components/cart";
import {
  CreditCardOutlined, CreditScoreOutlined,
} from "@mui/icons-material";

const OrderPage = () => {
  return (
    <ShopLayout
      title={`Resumen de la orden ABC123`}
      pageDesc={"Resumen de la orden ABC123"}
    >
      <Typography variant="h1" component="h1">
        Orden: ABC123
      </Typography>
      {/* <Chip
        sx={{ my: 2 }}
        label="pendiente de pago"
        variant="outlined"
        color="warning"
        icon={<CreditCardOffOutlined />}
      /> */}
      <Chip
        sx={{ my: 2 }}
        label="Orden pagada"
        variant="outlined"
        color="success"
        icon={<CreditScoreOutlined />}
      />
      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList editable={false} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2" component="h2">
                Resumen(3 productos)
              </Typography>
              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="end">
                <NextLink href="/checkout/address" passHref>
                  <Link underline="always" component="span">
                    Editar direccion
                  </Link>
                </NextLink>
              </Box>

              <Typography variant="subtitle1">Direcion de entrega</Typography>
              <Typography>Sebastian</Typography>
              <Typography>Algun lugar por la montaña</Typography>
              <Typography>Cartagen</Typography>
              <Typography>13044</Typography>
              <Typography>Colombia</Typography>
              <Typography>+57 3002236417</Typography>

              <Divider sx={{ my: 1 }} />
              <Box display="flex" justifyContent="end">
                <NextLink href="/cart" passHref>
                  <Link underline="always" component="span">
                    Editar compra
                  </Link>
                </NextLink>
              </Box>
              <CartOrderSummary />

              <Box sx={{ mt: 3 }}>
                <Chip
                  sx={{ my: 2 }}
                  label="Orden pagada"
                  variant="outlined"
                  color="success"
                  icon={<CreditScoreOutlined />}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default OrderPage;
