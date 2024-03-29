import { Box, Typography } from "@mui/material";
import { ShopLayout } from "../../components/layouts";
import { ProductList } from "@/components/products";


interface Props{
    products: IProduct[],
    foundProducts: boolean,
    query: string;
}

const SearchPage:NextPage<Props> = ({products, foundProducts, query}) => {
  return (
    <ShopLayout
      title={`Next Shop | Buscar: ${query}`}
      pageDesc={`Pagina de busquedas de Nextshop para ${query}`}
    >
      <Typography variant="h1" component="h1">
        Buscar productos
      </Typography>
      {foundProducts ? (
        <Box display="flex">
          <Typography variant="h2" component="h2" sx={{ mb: 1 }}>
            Productos con:
          </Typography>
          <Typography
            variant="h2"
            component="h2"
            sx={{ mb: 1, ml: 1 }}
            color="secondary"
            fontWeight="bold"
            textTransform="capitalize"
          >
            {query}
          </Typography>
        </Box>
      ) : (
        <Box display="flex">
          <Typography variant="h2" component="h2" sx={{ mb: 1 }}>
            No se encontraron productos con:
          </Typography>
          <Typography
            variant="h2"
            component="h2"
            sx={{ mb: 1, ml: 1 }}
            color="error"
            fontWeight="bold"
          >
            {query}
          </Typography>
        </Box>
      )}
      <ProductList products={products} />
    </ShopLayout>
  );
};

import { GetServerSideProps, NextPage } from "next";
import { dbProducts } from "@/data";
import { IProduct } from '../../interfaces/products';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query = "" } = params as { query: string };
  if (query.length === 0) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }

  let products = await dbProducts.getProductsByTerms(query);

  const foundProducts= products.length>0;

  if(!foundProducts){
    products= await dbProducts.getAllProducts();
  }

  return {
    props: {
        products,
        foundProducts,
        query
    },
  };
};

export default SearchPage;
