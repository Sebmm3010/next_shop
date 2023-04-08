import { useContext } from "react";
import NextLink from "next/link";
import { AppBar, Button, Link, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { UiContext } from "@/context";

export const AdminNavbar = () => {
  const { toogleSideMenu } = useContext(UiContext);
  return (
    <AppBar>
      <Toolbar>
        <NextLink href="/" passHref>
          <Link component={"span"} display="flex" alignItems="center">
            <Typography variant="h6" component="h6">
              Next |
            </Typography>
            <Typography component="p" sx={{ ml: 0.5 }}>
              Shop
            </Typography>
          </Link>
        </NextLink>

        <Box flex={1} />

        <Button onClick={(e) => e.detail !== 0 && toogleSideMenu()}>
          Menú
        </Button>
      </Toolbar>
    </AppBar>
  );
};
