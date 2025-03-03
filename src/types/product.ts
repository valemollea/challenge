interface SpecificationType {
  name: string;
  value: string;
}

export interface ProductType {
  sku: string;
  name: string;
  description: string;
  image: string;
  category: {
    id: string;
    name: string;
  };
  brand: string;
  price: number;
  stock: number;
  specifications: { name: string; value: string }[];
}

export interface EnrichedProductType extends ProductType {
  specifications: SpecificationType[];
}

export interface SearchProductPayload {
  page?: number;
  size?: number;
  search?: string;
}

export interface GetProductsApiResponse {
  metadata: {
    page: number;
    first: boolean;
    last: boolean;
    size: number;
    empty: boolean;
    numberOfElements: number;
    totalElements: number;
    totalPages: number;
    content: ProductType[];
  };
}
