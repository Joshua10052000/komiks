import MangadexAPI from "@/lib/mangadex";
import { useQuery } from "@tanstack/react-query";

function useCoverQuery(id: string) {
  const coverQuery = useQuery({
    queryKey: ["cover", id],
    queryFn: async () => await MangadexAPI.getCover(id),
  });

  return coverQuery;
}
export { useCoverQuery };
