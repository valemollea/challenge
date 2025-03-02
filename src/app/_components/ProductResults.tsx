"use client";

import { useEffect } from "react";
import { Box, Button, Typography, CircularProgress } from "@mui/material";

import { useSearchProducts } from "@/hooks";

import type { SearchProductPayload } from "@/types/product";

import { ProductItem } from "./ProductItem";

export const ProductResults = (initialPageParam: SearchProductPayload) => {
  const { data, refetch, fetchNextPage, isFetching } = useSearchProducts({
    initialPageParam,
    search: initialPageParam.search,
  });

  useEffect(() => {
    refetch();
  }, [initialPageParam, refetch]);

  console.log({ data, isFetching });

  return (
    <>
      {isFetching && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {!isFetching && (
        <>
          <div className="grid grid-cols-5 gap-4">
            {data?.pages.flatMap((page) =>
              page.data.length > 0 ? (
                page.data.map((product) => (
                  <ProductItem key={product.sku} {...product} />
                ))
              ) : (
                <Typography
                  key="no-results"
                  variant="h5"
                  sx={{
                    gridColumn: "1/6",
                  }}
                >
                  No hay resultados para esta búsqueda. Intenta con otro valor.
                </Typography>
              )
            )}
          </div>
          {data && data.pages[data.pages.length - 1].next !== null && (
            <Button onClick={() => fetchNextPage()}>Ver más resultados</Button>
          )}
        </>
      )}
    </>
  );
};
