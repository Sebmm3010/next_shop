import { Card, CardActionArea, CardMedia, Grid, Typography } from '@mui/material';
import { ShopLayout } from '../components/layouts';
import { initialData } from '@/data/products';


export default function Home() {
  return (
    <ShopLayout title='Teslo Shop | Home' pageDesc='Ecommerce clon de teslo shop'>
      <Typography variant='h1' component='h1'>Home</Typography>
      <Typography variant='h2' component='h2' sx={{ mb: 1 }}>Todos los productos</Typography>

      <Grid container spacing={4}>
        {
          initialData.products.map(product=>(
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
          ))
        }
      </Grid>
    </ShopLayout>
  )
}
