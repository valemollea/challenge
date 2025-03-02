import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { DEFAULT_SEARCH_PARAMS, useSearchProducts } from "@/hooks";

import { Products } from "./_components";

export default async function ProductList() {
  const queryClient = new QueryClient();
  await useSearchProducts.prefectQuery(queryClient, {
    initialPageParam: DEFAULT_SEARCH_PARAMS,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Products {...DEFAULT_SEARCH_PARAMS} />
    </HydrationBoundary>
  );
}
