import {
  Typography,
  Grid,
  TextField,
  FormControl,
  Box,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { ShopLayout } from "@/components/layouts";

const AddressPage = () => (
  <ShopLayout
    title={"Direccion de envio"}
    pageDesc={"Formulario de direccion de envio"}
  >
    <Typography variant="h1" component="h1">
      Direccion
    </Typography>
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField label="Nombre*" variant="filled" fullWidth />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField label="Apellidos*" variant="filled" fullWidth />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField label="Direccion*" variant="filled" fullWidth />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField label="Direccion 2" variant="filled" fullWidth />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField label="Ciudad" variant="filled" fullWidth />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField label="Codigo Postal" variant="filled" fullWidth />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <Select variant="filled" label="Pais" value={1}>
            <MenuItem value={1}>Colombia</MenuItem>
            <MenuItem value={2}>Venezuela</MenuItem>
            <MenuItem value={3}>Argentina</MenuItem>
            <MenuItem value={4}>México</MenuItem>
            <MenuItem value={5}>Chile</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField label="Telefono" variant="filled" fullWidth />
      </Grid>
    </Grid>

    <Box sx={{ mt: 5 }} display="flex" justifyContent="center">
      <Button color="secondary" className="circular-btn" size="large">
        Revisar pedido
      </Button>
    </Box>
  </ShopLayout>
);

export default AddressPage;
