import { FC, useContext } from "react";
import NextLink from "next/link";
import {
  CardActionArea,
  Grid,
  Link,
  CardMedia,
  Box,
  Typography,
  Button,
} from "@mui/material";
import { ItemCounter } from "../ui";
import { CartContext } from "@/context";

interface Props {
  editable: boolean;
}

export const CartList: FC<Props> = ({ editable }) => {
  const { cart } = useContext(CartContext);
  return (
    <>
      {cart.map((product) => (
        <Grid container spacing={2} sx={{ mb: 1 }} key={product.slug}>
          <Grid item xs={3}>
            <NextLink href="/product/slug" passHref>
              <Link component="span">
                <CardActionArea>
                  <CardMedia
                    image={`/products/${product.image}`}
                    component="img"
                    sx={{ borderRadius: "5px" }}
                  />
                </CardActionArea>
              </Link>
            </NextLink>
          </Grid>
          <Grid item xs={7}>
            <Box display="flex" flexDirection="column">
              <Typography variant="body1">{product.title}</Typography>
              <Typography variant="body1">
                Talla: <strong>M</strong>
              </Typography>
              {editable ? (
                <ItemCounter
                  quantity={product.quantity}
                  maxValue={10}
                  onQuantityChange={() => {}}
                />
              ) : (
                <Typography variant="h5">{product.quantity} {product.quantity>1 ? "productos": "producto"}</Typography>
              )}
            </Box>
          </Grid>
          <Grid
            item
            xs={2}
            display="flex"
            alignItems="center"
            flexDirection="column"
          >
            <Typography variant="subtitle1">{`$${product.price}`}</Typography>
            {/* Editable */}
            {editable && (
              <Button color="secondary" variant="text">
                Eliminar
              </Button>
            )}
          </Grid>
        </Grid>
      ))}
    </>
  );
};
