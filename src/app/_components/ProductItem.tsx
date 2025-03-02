"use client";

import Link from "next/link";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

import type { ProductType } from "@/types/product";

export const ProductItem = ({
  sku,
  category,
  brand,
  price,
}: Pick<ProductType, "sku" | "category" | "brand" | "price">) => (
  <Card sx={{ maxWidth: 345 }}>
    <CardMedia
      sx={{
        height: 160,
        background: "#bad4e3",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ShoppingBagIcon sx={{ color: "white", fontSize: 50 }} />
    </CardMedia>
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {sku}
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
    <CardActions>
      <Link href={`/products/${sku}`}>
        <Button size="small">Ver Detalle</Button>
      </Link>
    </CardActions>
  </Card>
);
