import type { ProductType } from "@/types/product";

export const fetchProductBySku = async (sku: ProductType["sku"]) => {
  const response = await fetch(`${process.env.API_BASE_URL}/products/${sku}`);

  if (response.status === 404) {
    throw new Error("No encontrado");
  }

  if (response.status === 500) {
    throw new Error("No se pudo cargar");
  }

  return response.json();
};
