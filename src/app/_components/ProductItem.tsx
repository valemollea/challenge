"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";

import type { ProductType } from "@/types/product";

export const ProductItem = ({
  sku,
  name,
  image,
  category,
  brand,
  price,
}: Pick<
  ProductType,
  "sku" | "name" | "image" | "category" | "brand" | "price"
>) => (
  <Card sx={{ maxWidth: 345, display: "flex", flexDirection: "column" }}>
    <CardMedia
      sx={{
        background: "#bad4e3",
        display: "flex",
        objectFit: "cover",
      }}
    >
      <Image src={image} alt={name} width={600} height={400} />
    </CardMedia>
    <CardContent
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
      }}
    >
      <Typography gutterBottom variant="body2" component="div">
        {sku}
      </Typography>
      <Typography gutterBottom variant="h5" component="div">
        {name}
      </Typography>
      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        {`Categoria: ${category.name}`}
      </Typography>
      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        {`Marca: ${brand}`}
      </Typography>
      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        {`Precio: $${price}`}
      </Typography>
    </CardContent>
    <Box
      sx={{
        p: 2,
        m: "auto 0 0 auto",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "flex-end",
      }}
    >
      <Link href={`/products/${sku}`}>
        <Button size="small">Ver Detalle</Button>
      </Link>
    </Box>
  </Card>
);
