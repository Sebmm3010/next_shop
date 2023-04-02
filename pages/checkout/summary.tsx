import { useContext } from "react";
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
import { CartContext } from "@/context";
import { countries } from "@/utils";

const SummaryPage = () => {
  const { shippingAddress, numberOfItems } = useContext(CartContext);
  if (!shippingAddress) {
    return <></>;
  }
  return (
    <ShopLayout title={`Resumen de la orden`} pageDesc={"Resumen de la orden"}>
      <Typography variant="h1" component="h1">
        Resumen de la orden
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList editable={false} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2" component="h2">
                Resumen({numberOfItems} productos)
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
              <Typography>
                {shippingAddress?.name} {shippingAddress?.lastName}
              </Typography>
              <Typography>{shippingAddress?.address1}</Typography>
              <Typography>{shippingAddress?.address2}</Typography>
              <Typography>{shippingAddress?.city}</Typography>
              <Typography>{shippingAddress?.postalCode}</Typography>
              <Typography>{countries.find(c=> (c.code===shippingAddress.country))?.name}</Typography>
              <Typography>{shippingAddress?.phone}</Typography>

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
