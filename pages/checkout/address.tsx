import { useContext } from "react";
import { useRouter } from "next/router";
import {
  Typography,
  Grid,
  TextField,
  FormControl,
  Box,
  MenuItem,
  Button,
} from "@mui/material";
import { ShopLayout } from "@/components/layouts";
import { countries } from "@/utils";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { CartContext } from "@/context";

interface FormData {
  name: string;
  lastName: string;
  address1: string;
  address2?: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
}

const getAddressFromCookies = (): FormData => {
  return {
    name: Cookies.get("name") || "",
    lastName: Cookies.get("lastName") || "",
    address1: Cookies.get("address1") || "",
    address2: Cookies.get("address2") || "",
    city: Cookies.get("city") || "",
    postalCode: Cookies.get("postalCode") || "",
    country: Cookies.get("country") || "",
    phone: Cookies.get("phone") || "",
  };
};

const AddressPage = () => {
  const { updateAddress } = useContext(CartContext);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: getAddressFromCookies(),
  });

  const onSubmit = (data: FormData) => {

    updateAddress(data);

    router.push("/checkout/summary");
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
                defaultValue={
                  Cookies.get("country")
                    ? Cookies.get("country")
                    : countries[0].code
                }
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
