import { NextPage } from "next";
import { Grid, Box, Typography, Button, Chip } from "@mui/material";
import { ShopLayout } from "@/components/layouts";
import { ProducrSizeSelector, ProductSlideShow } from "@/components/products";
import { ItemCounter } from "../../components/ui";
import { IProduct } from "../../interfaces";

interface Props {
  product: IProduct;
}

const ProductPage: NextPage<Props> = ({ product }) => {
  // const router = useRouter();
  // const { products:product, isLoading }=useProducts<IProduct>(`/products/${router.query.slug}`);
  // console.log(product);

  return (
    <ShopLayout title={product.title} pageDesc={product.description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <ProductSlideShow images={product.images} />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Box display="flex" flexDirection="column">
            {/* Titulos */}
            <Typography variant="h1" component="h1">
              {product.title}
            </Typography>
            <Typography variant="subtitle1" component="h2">
              ${product.price}
            </Typography>

            {/* Cantidad */}
            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle2">Cantidad</Typography>
              <ItemCounter />
              <ProducrSizeSelector
                sizes={product.sizes}
              />
            </Box>

            {/* AddCard */}
            <Button className="circular-btn" color="secondary">
              Agregar al carrito
            </Button>

            {/* <Chip label='No hay disponibles' color="error" variant="outlined"/> */}

            {/* Description */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2">Descripcion</Typography>
              <Typography variant="body2">{product.description}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
import { GetStaticPaths } from 'next'

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const productsSlugs = await dbProducts.getAllSlugs();  // your fetch function here 

  return {
    paths: productsSlugs.map(({slug})=>({
      params:{
        slug
      }
    })),
    fallback: "blocking"
  }
}

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.
import { GetStaticProps } from "next";
import { dbProducts } from '@/data';

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug="" } = params as { slug: string }; // your fetch function here
  const product= await dbProducts.getProductsBySlug(slug);

  if(!product){
    return{
      redirect:{
        destination:"/",
        permanent:false
      }
    }
  }

  return {
    props: {
      product
    },
    revalidate:60*60*24
  };
};

export default ProductPage;
