import { ShopLayout } from "@/components/layouts";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const Page404 = () => {
  return (
    <ShopLayout title="Page not found" pageDesc="Didn't find it">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 200px)"
        sx={{ flexDirection: { xs: "column", sm: "row" } }}
      >
        <Typography variant="h1" component="h1" fontSize={80} fontWeight={200}>
          {" "}
          404 |
        </Typography>
        <Typography marginLeft={2}>
          No se puedo encontrar la pagina :(
        </Typography>
      </Box>
    </ShopLayout>
  );
};

export default Page404;
