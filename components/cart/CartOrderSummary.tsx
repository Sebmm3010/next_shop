import { Grid, Typography } from "@mui/material";

export const CartOrderSummary = () => {
  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>No. Producto</Typography>
      </Grid>

      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>4</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Sub-Total</Typography>
      </Grid>

      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{`$${100000}`}</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Impuestos (19%)</Typography>
      </Grid>

      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{`$${19000}`}</Typography>
      </Grid>

      <Grid item xs={6} sx={{ mt: 2 }}>
        <Typography variant="subtitle1">Total a pagar</Typography>
      </Grid>

      <Grid sx={{ mt: 2 }} item xs={6} display="flex" justifyContent="end">
        <Typography variant="subtitle1">{`$${119000}`}</Typography>
      </Grid>
    </Grid>
  );
};
