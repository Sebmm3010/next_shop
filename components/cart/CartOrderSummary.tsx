import { FC, useContext } from "react";
import { Grid, Typography } from "@mui/material";
import { CartContext } from "@/context";
import { currency } from "@/utils";
import { IOrder } from "@/interfaces";

interface Props {
  data?: {
    numberOfItems: number;
    subTotal: number;
    iva: number;
    total: number;
  };
}

export const CartOrderSummary: FC<Props> = ({ data }) => {
  const cartContext = useContext(CartContext);
  const dataToShow = data ? data : cartContext;
  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>No. Productos</Typography>
      </Grid>

      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{dataToShow.numberOfItems}</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Sub-Total</Typography>
      </Grid>

      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{currency.format(dataToShow.subTotal)}</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>
          Impuestos {Number(process.env.NEXT_PUBLIC_IVA) * 100}%
        </Typography>
      </Grid>

      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{currency.format(dataToShow.iva)}</Typography>
      </Grid>

      <Grid item xs={6} sx={{ mt: 2 }}>
        <Typography variant="subtitle1">Total a pagar</Typography>
      </Grid>

      <Grid sx={{ mt: 2 }} item xs={6} display="flex" justifyContent="end">
        <Typography variant="subtitle1">
          {currency.format(dataToShow.total)}
        </Typography>
      </Grid>
    </Grid>
  );
};
