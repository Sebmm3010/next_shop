import { useState } from "react";
import NextLink from "next/link";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Link,
  Chip,
} from "@mui/material";
import { ErrorOutline, Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { AuthLayout } from "@/components/layouts";
import { validation } from "@/utils";
import { nextShopApi } from "@/api";

interface FormData {
  email: string;
  password: string;
}

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const handleLogin = async ({ email, password }: FormData) => {
    setShowError(false);

    try {
      const { data } = await nextShopApi.post("/user/login", {
        email,
        password,
      });
      const { token, user } = data;
      // Todo: Navigate to main page
      console.log({ token, user });
    } catch (error) {
      console.log("Error en credenciales");
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
    }
  };

  return (
    <AuthLayout title="Ingresar">
      <form onSubmit={handleSubmit(handleLogin)} noValidate>
        <Box sx={{ width: 350, padding: "10px 20px" }}>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              gap={2}
            >
              <Typography variant="h1" component="h1" textAlign="center">
                Iniciar sesión
              </Typography>
              {showError && (
                <Chip
                  className="fadeIn"
                  label="Correo / Contraseña no validos"
                  color="error"
                  icon={<ErrorOutline />}
                />
              )}
            </Grid>

            <Grid item xs={12}>
              <TextField
                type="email"
                label="Correo"
                variant="filled"
                fullWidth
                {...register("email", {
                  required: "El email es obligatorio",
                  validate: validation.isEmail,
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Contraseña"
                type={!showPassword ? "password" : "text"}
                variant="filled"
                fullWidth
                {...register("password", {
                  required: "La contraseña es obligatoria",
                  minLength: {
                    value: 6,
                    message: "La contraseña debe tener minimo 6 caracteres",
                  },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        onMouseDown={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                color="secondary"
                className="circular-btn"
                size="large"
                fullWidth
              >
                Ingresar
              </Button>
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="end">
              <NextLink href="/auth/registro" passHref>
                <Link
                  underline="always"
                  component="span"
                  sx={{ ":hover": { color: "#0535f5" } }}
                >
                  No tienes cuenta?
                </Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
