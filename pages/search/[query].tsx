import { Typography } from "@mui/material";
import { ShopLayout } from "../../components/layouts";
import { ProductList } from "@/components/products";


interface Props{
    products: IProduct[]
}

const SearchPage:NextPage<Props> = ({products}) => {
  return (
    <ShopLayout
      title="Next Shop | Buscar"
      pageDesc="Pagina de busquedas de Nextshop"
    >
      <Typography variant="h1" component="h1">
        Buscar producto
      </Typography>
      <Typography variant="h2" component="h2" sx={{ mb: 1 }}>
        ABC----12213
      </Typography>
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

  return {
    props: {
        products
    },
  };
};

export default SearchPage;
