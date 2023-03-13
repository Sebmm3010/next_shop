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
} from "@mui/material";
import { ShopLayout } from "@/components/layouts";
import { CartList, CartOrderSummary } from "@/components/cart";

const SummaryPage = () => {
  return (
    <ShopLayout title={`Resumen de la orden`} pageDesc={"Resumen de la orden"}>
      <Typography variant="h1">Resumen de la orden</Typography>
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
                <Button color="secondary" className="circular-btn" fullWidth>
                  Confirmar orden
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default SummaryPage;
