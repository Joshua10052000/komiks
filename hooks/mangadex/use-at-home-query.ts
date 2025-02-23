import MangadexAPI from "@/lib/mangadex";
import { useQuery } from "@tanstack/react-query";

function useAtHomeQuery(id: string) {
  const atHomeQuery = useQuery({
    queryKey: ["at-home", "server", id],
    queryFn: async () => await MangadexAPI.getAtHome(id),
  });

  return atHomeQuery;
}

export { useAtHomeQuery };
