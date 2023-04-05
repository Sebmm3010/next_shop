import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
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
import { CartContext } from "@/context";
import { countries } from "@/utils";
import Cookies from "js-cookie";

const SummaryPage = () => {
  const { shippingAddress, numberOfItems, createOrders } =
    useContext(CartContext);
  const [isPosting, setIsPosting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const router = useRouter();
  //* Saber si hay ordenes en las cookies
  useEffect(() => {
    if (!Cookies.get("name")) {
      router.push("/checkout/address");
    }
  }, [router]);

  if (!shippingAddress) {
    return <></>;
  }

  const handleCreateOrders = async () => {
    setIsPosting(true);
    const { hasError, message } = await createOrders();

    if (hasError) {
      setIsPosting(false);
      setErrorMsg(message);
      return;
    }
    router.replace(`/orders/${message}`);
  };
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
              <Typography>
                {
                  countries.find((c) => c.code === shippingAddress.country)
                    ?.name
                }
              </Typography>
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

              <Box sx={{ mt: 3 }} display="flex" flexDirection="column" gap={2}>
                <Button
                  color="secondary"
                  className="circular-btn"
                  fullWidth
                  onClick={handleCreateOrders}
                  disabled={isPosting}
                >
                  Realizar orden
                </Button>

                <Chip
                  color="error"
                  label={errorMsg}
                  sx={{ display: errorMsg ? "flex" : "none" }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default SummaryPage;
