"use client";

import { useEffect, Fragment } from "react";
import { Button, Typography } from "@mui/material";

import { useSearchProducts } from "@/hooks";

import type { SearchProductPayload } from "@/types/product";

import { ProductItem } from "./ProductItem";

export const ProductResults = (initialPageParam: SearchProductPayload) => {
  const { data, refetch, fetchNextPage, hasNextPage, isError } =
    useSearchProducts({
      initialPageParam,
      search: initialPageParam.search,
    });

  useEffect(() => {
    refetch();
  }, [initialPageParam, refetch]);

  if (isError) {
    return (
      <Typography
        variant="h5"
        sx={{
          gridColumn: "1/6",
        }}
      >
        Algo salió mal.
      </Typography>
    );
  }

  return (
    <>
      <div className="grid grid-cols-5 gap-4">
        {data?.pages.flatMap((page, index) => (
          <Fragment key={index}>
            {page.length > 0 ? (
              page.map((product) => (
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
            )}
          </Fragment>
        ))}
      </div>
      {data && hasNextPage && (
        <Button onClick={() => fetchNextPage()}>Ver más resultados</Button>
      )}
    </>
  );
};
