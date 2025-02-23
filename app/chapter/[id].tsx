import { useAtHomeQuery } from "@/hooks/mangadex/use-at-home-query";
import { Image, useImage } from "expo-image";
import { UnknownOutputParams, useLocalSearchParams } from "expo-router";
import { useCallback, useMemo } from "react";
import { FlatList, useWindowDimensions } from "react-native";

interface SearchParams extends UnknownOutputParams {
  id: string;
}

const ChapterDetailsScreen = () => {
  const searchParams = useLocalSearchParams<SearchParams>();
  const atHomeQuery = useAtHomeQuery(searchParams.id);
  const allAtHome = useMemo(
    () => atHomeQuery.data?.chapter.data ?? [],
    [atHomeQuery.data]
  );

  const handleRefresh = useCallback(async () => {
    await atHomeQuery.refetch();
  }, []);

  return (
    <FlatList
      refreshing={atHomeQuery.isRefetching}
      onRefresh={handleRefresh}
      extraData={atHomeQuery.data}
      data={allAtHome}
      renderItem={({ item }) => {
        const chapterUrl = atHomeQuery.data
          ? `${atHomeQuery.data.baseUrl}/data/${atHomeQuery.data.chapter.hash}/${item}`
          : require("@/assets/images/placeholder.png");

        return <ChapterDetailsItem imageUrl={chapterUrl} />;
      }}
    />
  );
};

interface ChapterDetailsItemProps {
  imageUrl: string;
}

const ChapterDetailsItem = ({ imageUrl }: ChapterDetailsItemProps) => {
  const windowDimensions = useWindowDimensions();
  const image = useImage(imageUrl, { maxWidth: windowDimensions.width });
  const aspectRatio = image ? image.width / image.height : 1;
  const calculatedHeight = windowDimensions.width / aspectRatio;

  return (
    <Image
      source={image}
      style={{
        width: windowDimensions.width,
        height: calculatedHeight,
      }}
      placeholder={require("@/assets/images/placeholder.png")}
    />
  );
};

export default ChapterDetailsScreen;
