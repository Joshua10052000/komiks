import MangadexAPI from "@/lib/mangadex";
import { useQuery } from "@tanstack/react-query";

function useMangaTagsQuery() {
  const mangaTagsQuery = useQuery({
    queryKey: ["mangas", "tags"],
    queryFn: async () => await MangadexAPI.getMangaTags(),
  });

  return mangaTagsQuery;
}

export { useMangaTagsQuery };
