import { FC } from 'react';
import { Card, CardActionArea, CardMedia, Grid } from '@mui/material';
import { IProduct } from '@/interfaces';

interface Props{
  product: IProduct;
}

export const ProductCard:FC<Props> = ({product}) => {
  return (
    <Grid xs={6} sm={4} key={product.slug} item>
      <Card>
        <CardActionArea>
          <CardMedia
            component='img'
            image={`products/${product.images[0]}`}
          />
        </CardActionArea>
      </Card>
    </Grid>
  )
}
