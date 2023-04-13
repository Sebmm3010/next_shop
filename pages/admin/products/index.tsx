import NextLink from "next/link";
import { CardMedia, Typography, Link, Box, Button } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { AddOutlined, CategoryOutlined } from "@mui/icons-material";
import { AdminLayout } from "@/components/layouts";
import useSWR from "swr";
import { IProduct } from "@/interfaces";
import { DataTable, FullScreenLoading } from "@/components/ui";
import { currency } from "@/utils";
import { useRouter } from "next/router";

const columns: GridColDef[] = [
  {
    field: "img",
    headerName: "Foto",
    renderCell: ({ row }: GridRenderCellParams) => {
      return (
        <a
          className="link"
          href={`/product/${row.slug}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <CardMedia
            className="fadeIn"
            component={"img"}
            image={`/products/${row.img}`}
            alt={row.img}
          />
        </a>
      );
    },
  },
  {
    field: "title",
    headerName: "Nombre del producto",
    width: 300,
    renderCell: ({ row }: GridRenderCellParams) => {
      return (
        <NextLink href={`/admin/products/${row.slug}`} passHref>
          <Link component={"span"} underline="always">
            {row.title}
          </Link>
        </NextLink>
      );
    },
  },
  { field: "gender", headerName: "Genero" },
  { field: "type", headerName: "Tipo" },
  { field: "inStock", headerName: "En inventario" },
  { field: "price", headerName: "Precio" },
  { field: "sizes", headerName: "Tallas", width: 250 },
];

const ProductsPageAdmin = () => {
  const { data, error } = useSWR<IProduct[]>("/api/admin/products");
  const router=useRouter();
  if (!error && !data) {
    return <FullScreenLoading />;
  }
  if (error) {
    console.log(error);
    return <Typography>Error al cargar la información</Typography>;
  }

  const rows = data!.map((product) => ({
    id: product._id,
    img: product.images[0],
    title: product.title,
    gender: product.gender,
    type: product.type,
    inStock: product.inStock,
    price: currency.format(product.price),
    sizes: product.sizes.join(", "),
    slug: product.slug,
  }));
  return (
    <AdminLayout
      title={`Productos: ${data!.length}`}
      subtitle="Mantenimiento de productos"
      icon={<CategoryOutlined />}
    >
      <Box display="flex" justifyContent="end" sx={{ mb: 2 }}>
        <Button startIcon={<AddOutlined />} color="secondary" onClick={()=>router.push("/admin/products/new")}>
          Crear nuevo producto
        </Button>
      </Box>
      <DataTable rows={rows} columns={columns} />
    </AdminLayout>
  );
};

export default ProductsPageAdmin;
