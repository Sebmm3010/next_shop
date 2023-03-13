import NextLink from "next/link";
import { RemoveShoppingCartOutlined } from "@mui/icons-material";
import { Box, Link, Typography } from "@mui/material";
import { ShopLayout } from "../../components/layouts/ShopLayout";
const EmptyPage = () => {
  return (
    <ShopLayout
      title={"Carro vacio"}
      pageDesc={"No hay articulos en el carrito de compras"}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 200px)"
        sx={{ flexDirection: { xs: "column", sm: "row" } }}
      >
        <RemoveShoppingCartOutlined sx={{ fontSize: 100 }} />
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography>El carrito esta vació</Typography>
          <NextLink href="/" passHref>
            <Link component={"span"}>
              <Typography color="secondary" variant="h4" component="h4">
                Regresar
              </Typography>
            </Link>
          </NextLink>
        </Box>
      </Box>
    </ShopLayout>
  );
};

export default EmptyPage;
