import { Typography } from "@mui/material";
import { ShopLayout } from "../../components/layouts";
import { ProductList } from "@/components/products";
import { useProducts } from "@/hooks";
import { FullScreenLoading } from "../../components/ui";

const SearchPage=()=> {
  const { products, isLoading } = useProducts("/search/pac");
  return (
    <ShopLayout title="Next Shop | Buscar" pageDesc="Pagina de busquedas de Nextshop">
      <Typography variant="h1" component="h1">
        Buscar producto
      </Typography>
      <Typography variant="h2" component="h2" sx={{ mb: 1 }}>
        ABC----12213
      </Typography>
      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
}



export default SearchPage;