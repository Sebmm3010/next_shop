import {
  Grid,
  Typography,
  Card,
  CardContent,
  Divider,
  Box,
  Button,
} from "@mui/material";
import { ShopLayout } from "@/components/layouts";
import { CartList } from "@/components/cart";

const index = () => {
  return (
    <ShopLayout title={`Carrito(${2})`} pageDesc={"Carrito de la tienda"}>
      <Typography variant="h1">Carrito</Typography>
      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2" component="h2">
                Orden
              </Typography>
              <Divider sx={{ my: 1 }} />
              {/* Order Summary */}

              <Box sx={{ mt: 3 }}>
                <Button color="secondary" className="circular-btn" fullWidth>
                  Pagar
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default index;
