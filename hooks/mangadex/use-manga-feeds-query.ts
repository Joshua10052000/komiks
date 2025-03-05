import MangadexAPI from "@/lib/mangadex";
import { ChaptersQuerySchema } from "@/lib/zod";
import { useInfiniteQuery } from "@tanstack/react-query";

function useMangaFeedsQuery(id: string, queries?: ChaptersQuerySchema) {
  const mangaFeedQuery = useInfiniteQuery({
    queryKey: ["mangas", id, "feed"],
    queryFn: async ({ pageParam }) =>
      await MangadexAPI.getMangaFeed(id, { ...queries, offset: pageParam }),
    getNextPageParam: (lastPage) => {
      const nextOffset = lastPage.offset + lastPage.limit;
      const pageParams =
        nextOffset < lastPage.total ? nextOffset : lastPage.total;

      return pageParams;
    },
    initialPageParam: 0,
  });

  return mangaFeedQuery;
}

export { useMangaFeedsQuery };
