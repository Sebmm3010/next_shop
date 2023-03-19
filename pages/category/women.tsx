import { Typography } from "@mui/material";
import { ShopLayout } from "../../components/layouts";
import { ProductList } from "@/components/products";
import { useProducts } from "@/hooks";
import { FullScreenLoading } from "../../components/ui";

export default function WomenPage() {
  const { products, isLoading } = useProducts("/products?gender=mujer");
  return (
    <ShopLayout
      title="Next Shop | Mujeres"
      pageDesc="Los mejores productos para mujeres de NextShop"
    >
      <Typography variant="h1" component="h1">
        Mujeres
      </Typography>
      <Typography variant="h2" component="h2" sx={{ mb: 1 }}>
        Productos para damas
      </Typography>
      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
}
