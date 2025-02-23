import MangadexAPI from "@/lib/mangadex";
import { MangasQuerySchema } from "@/lib/zod";
import { useInfiniteQuery } from "@tanstack/react-query";

function useMangasQuery(queries?: MangasQuerySchema) {
  const mangasQuery = useInfiniteQuery({
    queryKey: ["mangas", queries],
    queryFn: async ({ pageParam }) => {
      const response = await MangadexAPI.getMangas({
        ...queries,
        offset: pageParam,
      });

      return response;
    },
    getNextPageParam: (lastPage) => {
      const nextOffset = lastPage.offset + lastPage.limit;
      const pageParams =
        nextOffset < lastPage.total ? nextOffset : lastPage.total;

      return pageParams;
    },
    initialPageParam: 0,
  });

  return mangasQuery;
}

export { useMangasQuery };
