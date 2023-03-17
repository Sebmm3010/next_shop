import { Typography } from "@mui/material";
import { ShopLayout } from "../components/layouts";
import { initialData } from "@/data/products";
import { ProductList } from "@/components/products";
import { useProducts } from "@/hooks";
import { FullScreenLoading } from '../components/ui';

export default function Home() {
  const { products, isError, isLoading } = useProducts("/products");
  return (
    <ShopLayout
      title="Teslo Shop | Home"
      pageDesc="Ecommerce clon de teslo shop"
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
