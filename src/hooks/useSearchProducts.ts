import {
  QueryClient,
  useInfiniteQuery,
  QueryFunctionContext,
  FetchInfiniteQueryOptions,
  GetNextPageParamFunction,
  UseInfiniteQueryOptions,
  InfiniteData,
} from "@tanstack/react-query";

import { DEFAULT_SEARCH_PARAMS, PRODUCT_QUERY_KEY_PREFIX } from "./constants";

import type { ProductType, SearchProductPayload } from "@/types/product";

const productsQueryKey = [PRODUCT_QUERY_KEY_PREFIX, "list"] as const;
type ProductsQueryKeyType = typeof productsQueryKey;

export const fetchProducts = async ({
  pageParam: { search, ...pageParams } = DEFAULT_SEARCH_PARAMS,
}: QueryFunctionContext<ProductsQueryKeyType, SearchProductPayload>) => {
  const endpointUrl = new URL("http://localhost:4000/products");

  if (pageParams) {
    Object.keys(pageParams).forEach(
      // @ts-expect-error: Unreachable code error
      (key: keyof Omit<SearchProductPayload, "search">) => {
        if (pageParams[key] != null) {
          // transformations required to use json server parameters
          const currentKey = key === "size" ? "_limit" : `_${key}`;
          const currentValue =
            key === "page" ? pageParams[key] + 1 : pageParams[key];

          endpointUrl.searchParams.append(currentKey, `${currentValue}`);
        }
      }
    );
  }

  // required to use json server parameters
  if (search != null && search !== "") {
    if (search.startsWith("PROD-")) {
      endpointUrl.searchParams.append("sku", search);
    } else {
      endpointUrl.searchParams.append("name_like", search);
    }
  }

  const response = await fetch(endpointUrl);

  return response.json();
};

const getNextPageParam: GetNextPageParamFunction<
  SearchProductPayload,
  ProductType[]
> = (lastPage, _, lastPageParam) =>
  lastPage.length === lastPageParam?.size
    ? {
        page: (lastPageParam?.page ?? 0) + 1,
        size: lastPageParam?.size,
        search: lastPageParam?.search,
      }
    : undefined;

export const useSearchProducts = <TData = ProductType[]>({
  search,
  ...options
}: { search: SearchProductPayload["search"] } & Omit<
  UseInfiniteQueryOptions<
    ProductType[],
    Error,
    InfiniteData<TData, SearchProductPayload>,
    ProductType[],
    ProductsQueryKeyType,
    SearchProductPayload
  >,
  "queryKey" | "queryFn" | "getNextPageParam"
>) =>
  useInfiniteQuery({
    ...options,
    queryKey: productsQueryKey,
    queryFn: ({ pageParam, ...fetchOptions }) =>
      fetchProducts({
        ...fetchOptions,
        pageParam: {
          ...pageParam,
          search,
        },
      }),
    getNextPageParam,
  });

useSearchProducts.prefectQuery = <TData = ProductType[]>(
  queryClient: QueryClient,
  options: Omit<
    FetchInfiniteQueryOptions<
      ProductType[],
      Error,
      TData,
      ProductsQueryKeyType,
      SearchProductPayload
    >,
    "queryKey" | "queryFn" | "getNextPageParam"
  >
) =>
  queryClient.prefetchInfiniteQuery({
    ...options,
    queryKey: productsQueryKey,
    queryFn: fetchProducts,
    getNextPageParam,
  });
