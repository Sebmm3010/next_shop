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
import { initialData } from "../../data/products";
import { ItemCounter } from "../ui";

const productList = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
  initialData.products[3],
];

export const CardList = () => {
  return (
    <>
      {productList.map((product) => (
        <Grid container spacing={2} sx={{ mb: 1 }} key={product.slug}>
          <Grid item xs={3}>
            <NextLink href="/product/slug" passHref>
              <Link component="span">
                <CardActionArea>
                  <CardMedia
                    image={`products/${product.images[0]}`}
                    component="img"
                    sx={{ borderRadius: "5px" }}
                  />
                </CardActionArea>
              </Link>
            </NextLink>
          </Grid>
          <Grid item xs={7}>
            <Box display="flex">
              <Typography variant="body1">{product.title}</Typography>
              <Typography variant="body1">
                Talla: <strong>M</strong>
              </Typography>

              {/* Condicional */}
            </Box>
          <ItemCounter />
          </Grid>
          <Grid
            item
            xs={2}
            display="flex"
            alignItems="center"
            flexDirection="column"
          >
            <Typography variant="subtitle1">{`${product.price}`}</Typography>
            {/* Editable */}
            <Button color="secondary" variant="text">
              Pagar
            </Button>
          </Grid>
        </Grid>
      ))}
    </>
  );
};
