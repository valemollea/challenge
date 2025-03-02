import { Typography } from "@mui/material";
import { fetchProductBySku } from "@/api";
import { ProductDetails } from "./_components";

interface ProductProps {
  params: { sku: string };
}

export default async function Product({ params }: ProductProps) {
  const { sku } = params;

  let product;
  try {
    product = await fetchProductBySku(sku);
  } catch (error) {
    if (error instanceof Error) {
      return <Typography variant="h5">{error.message}</Typography>;
    }
  }

  return <ProductDetails {...product} />;
}
