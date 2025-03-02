"use client";

import { useMemo } from "react";
import { useState, useCallback } from "react";
import { TextField } from "@mui/material";

import type { SearchProductPayload } from "@/types/product";

import { ProductResults } from "./ProductResults";

export const Products = (initialPageParam: SearchProductPayload) => {
  const [debounceInterval, setDebounceInterval] = useState<
    NodeJS.Timeout | undefined
  >();
  const [searchInput, setSearchInput] = useState<string>(
    initialPageParam.search ?? ""
  );

  const pageParams = useMemo(
    () => ({
      ...initialPageParam,
      search: searchInput,
    }),
    [initialPageParam, searchInput]
  );

  const handleInputChange = useCallback(
    (value: string) => {
      setDebounceInterval(setTimeout(() => setSearchInput(value), 500));

      return clearTimeout(debounceInterval);
    },
    [debounceInterval]
  );

  return (
    <>
      <TextField
        fullWidth
        label="Busca un producto"
        id="fullWidth"
        onChange={(event) => handleInputChange(event.target.value)}
        sx={{
          alignSelf: "flex-start",
        }}
      />
      <ProductResults {...pageParams} />
    </>
  );
};
