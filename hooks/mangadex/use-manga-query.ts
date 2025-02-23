import MangadexAPI from "@/lib/mangadex";
import { MangaQuerySchema } from "@/lib/zod";
import { useQuery } from "@tanstack/react-query";

function useMangaQuery(id: string, queries?: MangaQuerySchema) {
  const mangaQuery = useQuery({
    queryKey: ["mangas", id],
    queryFn: async () => await MangadexAPI.getManga(id, queries),
  });

  return mangaQuery;
}

export { useMangaQuery };
