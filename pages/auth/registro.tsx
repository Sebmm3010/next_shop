import { useContext, useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
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
import { Visibility, VisibilityOff, ErrorOutline } from "@mui/icons-material";
import { AuthLayout } from "@/components/layouts";
import { validation } from "@/utils";
import { nextShopApi } from "@/api";
import { AuthContext } from "@/context";

interface FormData {
  name: string;
  email: string;
  password: string;
  password2: string;
}

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const { registerUser } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const handleRegister = async ({ name, email, password }: FormData) => {
    setShowError(false);
    const { hasError, message } = await registerUser(name, email, password);

    if (hasError) {
      setShowError(true);

      setErrorMessage(message!);

      setTimeout(() => {
        setShowError(false);
      }, 3000);

      return;
    }

    router.replace("/");
  };
  return (
    <AuthLayout title="Registrarse">
      <form onSubmit={handleSubmit(handleRegister)} noValidate>
        <Box sx={{ width: 350, padding: "10px 20px" }}>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              <Typography variant="h1" component="h1" textAlign="center">
                Crear cuenta
              </Typography>
              {showError && (
                <Chip
                  className="fadeIn"
                  label="Correo ya en uso"
                  color="error"
                  icon={<ErrorOutline />}
                />
              )}
            </Grid>

            <Grid item xs={12}>
              <TextField
                type="text"
                label="Nombre"
                variant="filled"
                fullWidth
                {...register("name", {
                  required: "El nombre es obligatorio",
                  minLength: {
                    value: 2,
                    message: "Nombre de tener minimo 2 caracteres",
                  },
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
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
                        {!showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Confirmar contraseña"
                type={!showPassword ? "password" : "text"}
                variant="filled"
                fullWidth
                {...register("password2", {
                  required: "Las contraseñas no coinciden",
                  validate: (values, formValues) =>
                    values === formValues.password
                      ? undefined
                      : "Las contraseñas no coinciden",
                })}
                error={!!errors.password2}
                helperText={errors.password2?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        onMouseDown={() => setShowPassword(!showPassword)}
                      >
                        {!showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                color="secondary"
                className="circular-btn"
                size="large"
                fullWidth
                type="submit"
              >
                Registrarse
              </Button>
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="end">
              <NextLink href="/auth/login" passHref>
                <Link
                  underline="always"
                  component="span"
                  sx={{ ":hover": { color: "#0535f5" } }}
                >
                  Ya tienes cuenta?
                </Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
