import { Typography } from "@mui/material";
import { ShopLayout } from "../../components/layouts";
import { ProductList } from "@/components/products";
import { useProducts } from "@/hooks";
import { FullScreenLoading } from "../../components/ui";

export default function KidPage() {
  const { products, isLoading } = useProducts("/products?gender=infantil");
  return (
    <ShopLayout
      title="Next Shop | Niños"
      pageDesc="Los mejores productos para niños de NextShop"
    >
      <Typography variant="h1" component="h1">
        Niños
      </Typography>
      <Typography variant="h2" component="h2" sx={{ mb: 1 }}>
        Productos para niños
      </Typography>
      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
}
