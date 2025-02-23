import { useCallback, useMemo, useState } from "react";
import { Theme, useTheme } from "@react-navigation/native";
import {
  UnknownOutputParams,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import { useMangasQuery } from "@/hooks/mangadex/use-mangas-query";
import { Ionicons } from "@expo/vector-icons";
import {
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { MangaCard } from "@/components/manga-card";
import { MangasQuerySchema } from "@/lib/zod";
import styles from "@/constants/styles";

interface SearchParams extends UnknownOutputParams {
  query: string;
}

const ExploreTab = () => {
  const theme = useTheme();
  const searchParams = useLocalSearchParams<SearchParams>();
  const queries = searchParams.query
    ? JSON.parse(searchParams.query)
    : {
        originalLanguage: ["ko-ro", "ko"],
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
        onChangeText={setSearchText}
        style={headerStyles.searchInput}
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
    searchInput: {
      borderStyle: "solid",
      borderLeftWidth: 1,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: theme.colors.border,
      borderTopLeftRadius: styles.sizes[2],
      borderBottomLeftRadius: styles.sizes[2],
      paddingLeft: styles.sizes[4],
      paddingRight: styles.sizes[10],
      paddingVertical: styles.sizes[2],
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
