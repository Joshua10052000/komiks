import { useCallback, useMemo, useState } from "react";
import { Theme, useTheme } from "@react-navigation/native";
import {
  UnknownOutputParams,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import { useMangasQuery } from "@/hooks/mangadex/use-mangas-query";
import { Ionicons } from "@expo/vector-icons";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { MangaCard } from "@/components/manga-card";
import { MangasQuerySchema } from "@/lib/zod";
import styles from "@/constants/styles";
import { TextInput } from "@/components/ui/text-input";

interface SearchParams extends UnknownOutputParams {
  query: string;
}

const ExploreTab = () => {
  const theme = useTheme();
  const searchParams = useLocalSearchParams<SearchParams>();
  const queries = searchParams.query
    ? JSON.parse(searchParams.query)
    : {
        includes: ["cover_art"],
        order: { latestUploadedChapter: "desc" },
      };
  const mangasQuery = useMangasQuery(queries);
  const allMangas = useMemo(
    () => mangasQuery.data?.pages.flatMap((page) => page.data) ?? [],
    [mangasQuery.data]
  );

  const handleRefresh = useCallback(async () => {
    await mangasQuery.refetch();
  }, []);

  const { rootStyles } = createStyles(theme);

  return (
    <FlatList
      refreshing={mangasQuery.isRefetching}
      onRefresh={handleRefresh}
      data={allMangas}
      ListHeaderComponent={ExploreHeader}
      contentContainerStyle={rootStyles.container}
      columnWrapperStyle={rootStyles.wrapper}
      numColumns={3}
      renderItem={({ item }) => <MangaCard manga={item} />}
      onEndReached={() => {
        mangasQuery.hasNextPage && mangasQuery.fetchNextPage();
      }}
      keyExtractor={(item, index) => `${item.id}-${index}`}
    />
  );
};

const ExploreHeader = () => {
  const theme = useTheme();
  const router = useRouter();
  const [searchText, setSearchText] = useState("");

  const { headerStyles } = createStyles(theme);

  const handleSearch = useCallback(() => {
    router.push({
      pathname: "/(tabs)/explore",
      params: {
        query: JSON.stringify({
          title: searchText,
          includes: ["cover_art"],
        } satisfies MangasQuerySchema),
      },
    });
  }, [searchText]);

  return (
    <View style={[headerStyles.searchContainer, { flexGrow: 1 }]}>
      <TextInput
        value={searchText}
        style={{ paddingRight: styles.sizes[14] }}
        onChangeText={setSearchText}
        placeholder="Search..."
      />
      <TouchableOpacity
        onPress={handleSearch}
        style={headerStyles.searchButton}
      >
        <Ionicons
          name="search"
          size={styles.sizes[4]}
          color={theme.colors.background}
        />
      </TouchableOpacity>
    </View>
  );
};

const createStyles = (theme: Theme) => ({
  rootStyles: StyleSheet.create({
    container: {
      gap: styles.sizes[2],
      padding: styles.sizes[2],
    },
    wrapper: {
      gap: styles.sizes[2],
    },
  }),

  headerStyles: StyleSheet.create({
    searchContainer: {
      position: "relative",
      overflow: "hidden",
    },
    searchButton: {
      backgroundColor: theme.colors.primary,
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      right: 0,
      paddingHorizontal: styles.sizes[4],
      borderTopEndRadius: styles.sizes[2],
      borderEndEndRadius: styles.sizes[2],
    },
  }),
});

export default ExploreTab;
