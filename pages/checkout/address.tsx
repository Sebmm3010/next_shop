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
import { countries } from "@/utils";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";

interface FormData {
  name: string;
  lastName: string;
  address1: string;
  address2: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
}

const AddressPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      lastName: "",
      address1: "",
      address2: "",
      city: "",
      postalCode: "",
      country: countries[0].code,
      phone: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log({data});
    // Cookies.set("name", data.name);
    // Cookies.set("lastName", data.lastName);
    // Cookies.set("address1", data.address1);
    // Cookies.set("address2", data.address2 || "");
    // Cookies.set("city", data.city);
    // Cookies.set("postalCode", data.postalCode);
    // Cookies.set("country", data.country);
    // Cookies.set("phone", data.phone);
  };

  return (
    <ShopLayout
      title={"Direccion de envio"}
      pageDesc={"Formulario de direccion de envio"}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h1" component="h1">
          Direccion
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register("name", { required: "Este campo es obligatorio" })}
              label="Nombre*"
              variant="filled"
              fullWidth
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              {...register("lastName", {
                required: "Este campo es obligatorio",
              })}
              label="Apellidos*"
              variant="filled"
              fullWidth
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              {...register("address1", {
                required: "Este campo es obligatorio",
              })}
              label="Direccion*"
              variant="filled"
              fullWidth
              error={!!errors.address1}
              helperText={errors.address1?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              {...register("address2")}
              label="Direccion 2"
              variant="filled"
              fullWidth
              error={!!errors.address2}
              helperText={errors.address2?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              {...register("city", { required: "Este campo es obligatorio" })}
              label="Ciudad*"
              variant="filled"
              fullWidth
              error={!!errors.city}
              helperText={errors.city?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register("postalCode", {
                required: "Este campo es obligatorio",
                // valueAsNumber: true,
              })}
              label="Codigo Postal*"
              variant="filled"
              fullWidth
              error={!!errors.postalCode}
              helperText={errors.postalCode?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <TextField
                {...register("country", {
                  required: "Este campo es obligatorio",
                })}
                select
                defaultValue={countries[0].code}
                variant="filled"
                label="Pais*"
                error={!!errors.country}
                helperText={errors.country?.message}
              >
                {countries.map((country) => (
                  <MenuItem key={country.code} value={country.code}>
                    {country.name}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              {...register("phone", {
                required: "Este campo es obligatorio",
                // valueAsNumber: true,
              })}
              label="Telefono"
              variant="filled"
              fullWidth
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 5 }} display="flex" justifyContent="center">
          <Button
            type="submit"
            color="secondary"
            className="circular-btn"
            size="large"
          >
            Realizar pedido
          </Button>
        </Box>
      </form>
    </ShopLayout>
  );
};

// export const getServerSideProps: GetServerSideProps = async ({ req }) => {
//   const { token = "" } = req.cookies;
//   let isValidaToken = false;

//   try {
//     await jwt.isValidaToken(token);
//     isValidaToken = true;
//   } catch (error) {
//     isValidaToken = false;
//   }

//   if (!isValidaToken) {
//     return {
//       redirect: {
//         destination: "/auth/login?p=/checkout/address",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {},
//   };
// };

export default AddressPage;
