import { useContext }  from "react";
import { Grid, Typography } from "@mui/material";
import { CartContext } from "@/context";
import { currency } from "@/utils";

export const CartOrderSummary = () => {
  const { numberOfItems, iva, subTotal, total } =useContext(CartContext);
  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>No. Productos</Typography>
      </Grid>

      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{numberOfItems}</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Sub-Total</Typography>
      </Grid>

      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{currency.format(subTotal)}</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>
          Impuestos {Number(process.env.NEXT_PUBLIC_IVA) * 100}%
        </Typography>
      </Grid>

      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{currency.format(iva)}</Typography>
      </Grid>

      <Grid item xs={6} sx={{ mt: 2 }}>
        <Typography variant="subtitle1">Total a pagar</Typography>
      </Grid>

      <Grid sx={{ mt: 2 }} item xs={6} display="flex" justifyContent="end">
        <Typography variant="subtitle1">{currency.format(total)}</Typography>
      </Grid>
    </Grid>
  );
};
