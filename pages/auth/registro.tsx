import { useState } from "react";
import NextLink from "next/link";
import { AuthLayout } from "@/components/layouts";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Link,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <AuthLayout title="Registrarse">
      <Box sx={{ width: 350, padding: "10px 20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h1" component="h1">
              Crear cuenta
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField type="email" label="Correo" variant="filled" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Contraseña"
              type={!showPassword ? "password" : "text"}
              variant="filled"
              fullWidth
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
            <TextField
              label="Confirmar contraseña"
              type={!showPassword ? "password" : "text"}
              variant="filled"
              fullWidth
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
              color="secondary"
              className="circular-btn"
              size="large"
              fullWidth
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
    </AuthLayout>
  );
};

export default RegisterPage;
