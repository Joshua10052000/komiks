import MangadexAPI from "@/lib/mangadex";
import { useQuery } from "@tanstack/react-query";

function useScanlationGroupQuery(id: string) {
  const scanlationGroupQuery = useQuery({
    queryKey: ["scanlation_group", id],
    queryFn: async () => await MangadexAPI.getScanlationGroup(id),
  });

  return scanlationGroupQuery;
}

export { useScanlationGroupQuery };
