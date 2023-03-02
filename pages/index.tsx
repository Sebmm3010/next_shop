import { Typography } from '@mui/material';
import { ShopLayout } from '../components/layouts/ShopLayout';

export default function Home() {
  return (
    <ShopLayout title='Teslo Shop | Home' pageDesc='Ecommerce clon de teslo shop'>
      <Typography variant='h1' component='h1'>Home</Typography>
      <Typography variant='h2' component='h2' sx={{ mb: 1 }}>Todos los productos</Typography>
    </ShopLayout>
  )
}
