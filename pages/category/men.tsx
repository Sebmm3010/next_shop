import { Typography } from "@mui/material";
import { ShopLayout } from "../../components/layouts";
import { ProductList } from "@/components/products";
import { useProducts } from "@/hooks";
import { FullScreenLoading } from "../../components/ui";

export default function MenPage() {
  const { products, isLoading } = useProducts("/products?gender=hombre");
  return (
    <ShopLayout
      title="Next Shop | Hombres"
      pageDesc="Los mejores productos para hombres de NextShop"
    >
      <Typography variant="h1" component="h1">
        Hombres
      </Typography>
      <Typography variant="h2" component="h2" sx={{ mb: 1 }}>
        Productos para caballeros
      </Typography>
      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
}
