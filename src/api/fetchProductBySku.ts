import type { ProductType } from "@/types/product";

export const fetchProductBySku = async (sku: ProductType["sku"]) => {
  const endpointUrl = new URL("http://localhost:4000/products");
  endpointUrl.searchParams.append("sku", sku);

  const response = await fetch(`http://localhost:4000/products/${sku}`);

  if (response.status === 404) {
    throw new Error("No encontrado");
  }

  if (response.status === 500) {
    throw new Error("No se pudo cargar");
  }

  return response.json();
};
