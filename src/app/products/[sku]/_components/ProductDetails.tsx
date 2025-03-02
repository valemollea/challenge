import Image from "next/image";
import { Card, Typography } from "@mui/material";

import type { EnrichedProductType } from "@/types/product";

export const ProductDetails = ({
  name,
  sku,
  image,
  category,
  brand,
  price,
  specifications,
}: Pick<
  EnrichedProductType,
  "name" | "sku" | "image" | "category" | "brand" | "price" | "specifications"
>) => (
  <Card
    sx={{
      display: "flex",
      flexDirection: "column",
      gap: 3,
      p: 4,
    }}
  >
    <Image src={image} width={600} height={500} alt="Product image" />
    <div className="flex flex-row gap-6">
      <div className="grow-1">
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
      </div>

      <div className="p-3 border-1 border-gray-300 rounded-sm">
        <Typography variant="h6" sx={{ color: "text.secondary" }}>
          Especificaciones:
        </Typography>

        <ul>
          {specifications.map(({ name, value }) => (
            <li key={name}>
              {" "}
              <Typography
                variant="body2"
                sx={{ color: "text.secondary" }}
              >{`${name}: ${value}`}</Typography>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </Card>
);
