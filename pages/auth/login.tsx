import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { signIn, getSession, getProviders } from "next-auth/react";
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
  Divider,
} from "@mui/material";
import { ErrorOutline, Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { AuthLayout } from "@/components/layouts";
import { validation } from "@/utils";
interface FormData {
  email: string;
  password: string;
}

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowError] = useState(false);
  const [providers, setProviders] = useState<any>({});

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const destination = router.query.p?.toString() || "/";

  //Setear los providers que tengo
  useEffect(() => {
    getProviders().then((prov) => {
      // console.log(prov);
      setProviders(prov);
    });
  }, []);

  // Error de autenticacion
  useEffect(() => {
    if (router.query.error) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
      return;
    }
  }, [router.query.error]);

  const handleLogin = async ({ email, password }: FormData) => {
    setShowError(false);
    await signIn("credentials", { email, password });

    // const isValidLogin = await loginUser(email, password);
    // router.replace(destination);
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

            <Grid
              item
              xs={12}
              display="flex"
              flexDirection="column"
              justifyContent="end"
            >
              <Divider sx={{ width: "100%", mb: 2 }} />
              {Object.values(providers)
                .filter((provider: any) => provider.id !== "credentials")
                .map((provider: any) => {
                  return (
                    <Button
                      key={provider.id}
                      onClick={() => signIn(provider.id)}
                      variant="outlined"
                      fullWidth
                      color="primary"
                      sx={{ mb: 1 }}
                    >
                      {provider.name}
                    </Button>
                  );
                })}
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="start">
              <NextLink href={`/auth/registro?p=${destination}`} passHref>
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

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const session = await getSession({ req });
  const { p = "/" } = query;
  if (session) {
    return {
      redirect: {
        destination: p.toString(),
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default LoginPage;
