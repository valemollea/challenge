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

import type {
  GetProductsJSONServerResponse,
  SearchProductPayload,
} from "@/types/product";

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
          const currentKey = key === "size" ? "_per_page" : `_${key}`;
          const currentValue =
            key === "page" ? pageParams[key] + 1 : pageParams[key];

          endpointUrl.searchParams.append(currentKey, `${currentValue}`);
        }
      }
    );
  }

  // required to use json server parameters
  if (search != null && search !== "") {
    endpointUrl.searchParams.append("name_like", search);
    endpointUrl.searchParams.append("sku", search);
  }

  const response = await fetch(endpointUrl);

  return response.json();
};

const getNextPageParam: GetNextPageParamFunction<
  SearchProductPayload,
  GetProductsJSONServerResponse
> = (lastPage, _, lastPageParam) =>
  lastPage.next
    ? {
        page: lastPage.next - 1,
        size: lastPageParam?.size,
        search: lastPageParam?.search,
      }
    : undefined;

export const useSearchProducts = <TData = GetProductsJSONServerResponse>({
  search,
  ...options
}: { search: SearchProductPayload["search"] } & Omit<
  UseInfiniteQueryOptions<
    GetProductsJSONServerResponse,
    Error,
    InfiniteData<TData, SearchProductPayload>,
    GetProductsJSONServerResponse,
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

useSearchProducts.prefectQuery = <TData = GetProductsJSONServerResponse>(
  queryClient: QueryClient,
  options: Omit<
    FetchInfiniteQueryOptions<
      GetProductsJSONServerResponse,
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
