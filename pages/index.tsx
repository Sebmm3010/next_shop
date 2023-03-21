import { Typography } from "@mui/material";
import { ShopLayout } from "../components/layouts";
import { ProductList } from "@/components/products";
import { useProducts } from "@/hooks";
import { FullScreenLoading } from '../components/ui';

const HomePage=()=> {
  const { products, isLoading } = useProducts("/products");
  return (
    <ShopLayout
      title="Next Shop | Home"
      pageDesc="Ecommerce clon de Next shop"
    >
      <Typography variant="h1" component="h1">
        Home
      </Typography>
      <Typography variant="h2" component="h2" sx={{ mb: 1 }}>
        Todos los productos
      </Typography>
      {isLoading ? <FullScreenLoading/> : <ProductList products={products} />}
    </ShopLayout>
  );
}
export default HomePage;
