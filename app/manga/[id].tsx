import { useCallback, useMemo } from "react";
import { useMangaFeedsQuery } from "@/hooks/mangadex/use-manga-feeds-query";
import { useMangaQuery } from "@/hooks/mangadex/use-manga-query";
import {
  UnknownOutputParams,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import { FlatList, Pressable, Text, View } from "react-native";
import { BannerImage } from "@/components/banner-image";
import { Chapter, Manga } from "@/types/mangadex";
import Markdown from "react-native-markdown-display";
import styles from "@/constants/styles";
import { useTheme } from "@react-navigation/native";

interface SearchParams extends UnknownOutputParams {
  id: string;
}

const MangaDetailsScreen = () => {
  const searchParams = useLocalSearchParams<SearchParams>();
  const mangaFeedsQuery = useMangaFeedsQuery(searchParams.id, {
    order: { chapter: "asc" },
    includes: ["scanlation_group"],
    translatedLanguage: ["en"],
  });
  const mangaQuery = useMangaQuery(searchParams.id, {
    includes: ["cover_art"],
  });
  const allMangaFeeds = useMemo(
    () => mangaFeedsQuery.data?.pages.flatMap((page) => page.data) ?? [],
    [mangaFeedsQuery.data]
  );

  const handleRefresh = useCallback(async () => {
    await mangaFeedsQuery.refetch();
    await mangaQuery.refetch();
  }, []);

  const handleEndReached = useCallback(async () => {
    await mangaFeedsQuery.fetchNextPage();
  }, []);

  return (
    <FlatList
      refreshing={mangaFeedsQuery.isRefetching || mangaQuery.isRefetching}
      onRefresh={handleRefresh}
      data={allMangaFeeds}
      ListHeaderComponent={
        mangaQuery.data && <MangaDetailsHeader manga={mangaQuery.data.data} />
      }
      renderItem={({ item }) => <MangaDetailsItem chapter={item} />}
      onEndReached={handleEndReached}
      keyExtractor={(item, index) => `${item.id}-${index}`}
    />
  );
};

interface MangaDetailsHeader {
  manga: Manga;
}

const MangaDetailsHeader = ({ manga }: MangaDetailsHeader) => {
  const foundCover = manga.relationships.find(
    (relationship) => relationship.type === "cover_art"
  );

  // [TODO]: Change to not found
  const coverUrl = useMemo(
    () =>
      foundCover
        ? `https://uploads.mangadex.org/covers/${manga.id}/${foundCover?.attributes.fileName}.512.jpg`
        : require("@/assets/images/placeholder.png"),
    []
  );

  return (
    <View style={{ display: "flex", flexDirection: "column", flexShrink: 1 }}>
      <BannerImage imageUrl={coverUrl} />
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          gap: styles.sizes[2],
          padding: styles.sizes[2],
        }}
      >
        <View>
          <Text style={{ fontSize: styles.sizes[6], fontWeight: "900" }}>
            {manga.attributes.title.en}
          </Text>
          <Text style={{ fontSize: styles.sizes[4] }}>
            {
              // @ts-ignore
              manga.attributes.altTitles.find((altTitle) => altTitle)?.[
                manga.attributes.originalLanguage
              ]
            }
          </Text>
        </View>
        <Markdown>{manga.attributes.description.en}</Markdown>
      </View>
    </View>
  );
};

interface MangaDetailsItemProps {
  chapter: Chapter;
}

const MangaDetailsItem = ({ chapter }: MangaDetailsItemProps) => {
  const router = useRouter();
  const theme = useTheme();
  const foundScanlationGroup = chapter.relationships.find(
    (relationship) => relationship.type === "scanlation_group"
  );

  const handlePress = useCallback(() => {
    router.push({ pathname: "/chapter/[id]", params: { id: chapter.id } });
  }, []);

  return (
    <Pressable
      onPress={handlePress}
      style={{
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: styles.sizes[2],
        paddingVertical: styles.sizes[2],
        paddingHorizontal: styles.sizes[4],
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: styles.sizes[2],
        marginHorizontal: styles.sizes[2],
        marginBottom: styles.sizes[2],
      }}
    >
      <View>
        <Text>Chapter {chapter.attributes.chapter}</Text>
        <Text style={{ fontSize: styles.sizes[3] }}>
          {chapter.attributes.title}
        </Text>
      </View>
      <Text style={{ fontWeight: "500" }}>
        {foundScanlationGroup?.attributes?.name}
      </Text>
    </Pressable>
  );
};

export default MangaDetailsScreen;
