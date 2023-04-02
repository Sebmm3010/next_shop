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
import { ICartProduct } from "@/interfaces";
import { currency } from "@/utils";

interface Props {
  editable: boolean;
}

export const CartList: FC<Props> = ({ editable }) => {
  const { cart, updateProductQuantity, removeCartProduct } = useContext(CartContext);

  const onNewQuantityValue=(product:ICartProduct, newQuantity:number)=>{
    product.quantity= newQuantity;
    updateProductQuantity(product);
  }

  return (
    <>
      {cart.map((product) => (
        <Grid
          container
          spacing={2}
          sx={{ mb: 1 }}
          key={product.slug + product.size}
        >
          <Grid item xs={3}>
            <NextLink href={`/product/${product.slug}`} passHref>
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
                Talla: <strong>{product.size}</strong>
              </Typography>
              {editable ? (
                <ItemCounter
                  quantity={product.quantity}
                  maxValue={10}
                  onQuantityChange={(value) =>
                    onNewQuantityValue(product, value)
                  }
                />
              ) : (
                <Typography variant="h5">
                  {product.quantity}{" "}
                  {product.quantity > 1 ? "Items" : "Item"}
                </Typography>
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
            <Typography variant="subtitle1">{`${currency.format(
              product.price * product.quantity
            )}`}</Typography>
            {/* Editable */}
            {editable && (
              <Button
                color="secondary"
                variant="text"
                onClick={() => removeCartProduct(product)}
              >
                Eliminar
              </Button>
            )}
          </Grid>
        </Grid>
      ))}
    </>
  );
};
