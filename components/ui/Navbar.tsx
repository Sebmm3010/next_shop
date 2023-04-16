import { FC, useContext, useState } from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import {
  AppBar,
  Badge,
  Button,
  IconButton,
  Input,
  InputAdornment,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import {
  CloseOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { UiContext, CartContext } from "@/context";

interface Props {
  showMenu?: boolean;
}

export const Navbar: FC<Props> = ({ showMenu = true }) => {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");
  const [isInputVisible, setIsInputVisible] = useState(false);

  const onSearch = () => {
    if (searchInput.trim().length === 0) return;
    router.push(`/search/${searchInput}`);
  };

  const { toogleSideMenu } = useContext(UiContext);
  const { numberOfItems } = useContext(CartContext);
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

        <Box
          className="fadeIn"
          sx={{
            display: isInputVisible ? "none" : { xs: "none", sm: "block" },
          }}
        >
          <NextLink href="/category/men" passHref>
            <Link component={"span"}>
              <Button
                color={router.pathname === "/category/men" ? "primary" : "info"}
              >
                Hombres
              </Button>
            </Link>
          </NextLink>

          <NextLink href="/category/women" passHref>
            <Link component={"span"}>
              <Button
                color={
                  router.pathname.includes("/category/women")
                    ? "primary"
                    : "info"
                }
              >
                Mujeres
              </Button>
            </Link>
          </NextLink>

          <NextLink href="/category/kids" passHref>
            <Link component={"span"}>
              <Button
                color={
                  router.pathname.includes("/category/kid") ? "primary" : "info"
                }
              >
                Niños
              </Button>
            </Link>
          </NextLink>
        </Box>

        <Box flex={1} />

        {isInputVisible ? (
          <Input
            className="fadeIn"
            autoFocus
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSearch()}
            type="text"
            placeholder="Buscar..."
            sx={{ display: { xs: "none", sm: "flex" } }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {
                    setIsInputVisible(false);
                    setSearchInput("");
                  }}
                >
                  <CloseOutlined />
                </IconButton>

                <IconButton onClick={onSearch}>
                  <SearchOutlined />
                </IconButton>
              </InputAdornment>
            }
          />
        ) : (
          <IconButton
            onClick={() => setIsInputVisible(true)}
            sx={{ display: { xs: "none", sm: "flex" } }}
          >
            <SearchOutlined />
          </IconButton>
        )}

        {/* Pantalla pequeña */}
        <IconButton
          sx={{ display: { xs: "flex", sm: "none" } }}
          onClick={(e) => e.detail !== 0 && toogleSideMenu()}
        >
          <SearchOutlined />
        </IconButton>

        <NextLink href="/cart" passHref>
          <Link component={"span"}>
            <IconButton>
              <Badge
                badgeContent={numberOfItems > 9 ? "+9" : numberOfItems}
                color="secondary"
              >
                <ShoppingCartOutlined />
              </Badge>
            </IconButton>
          </Link>
        </NextLink>

        <Button
          sx={{ display: showMenu ? "flex" : "none" }}
          onClick={(e) => e.detail !== 0 && toogleSideMenu()}
        >
          Menú
        </Button>
      </Toolbar>
    </AppBar>
  );
};
