import { useCallback, useMemo } from "react";
import { Theme, useTheme } from "@react-navigation/native";
import { useMangasQuery } from "@/hooks/mangadex/use-mangas-query";
import { SectionList, StyleSheet, TouchableOpacity, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import styles from "@/constants/styles";
import { BannersFlatList } from "@/components/banners-flatlist";
import { MangasFlatList } from "@/components/mangas-flatlist";
import { Text } from "@/components/ui/text";

const HomeTab = () => {
  const theme = useTheme();
  const featuredMangaQuery = useMangasQuery({
    order: { rating: "desc" },
    includes: ["cover_art"],
  });

  const popularMangaQuery = useMangasQuery({
    order: { followedCount: "desc" },
    includes: ["cover_art"],
  });

  const featuredMangas = useMemo(
    () => featuredMangaQuery.data?.pages.flatMap((page) => page.data) ?? [],
    [featuredMangaQuery.data]
  );

  const popularMangas = useMemo(
    () => popularMangaQuery.data?.pages.flatMap((page) => page.data) ?? [],
    [popularMangaQuery.data]
  );

  const sections = useMemo(
    () => [
      {
        title: "Popular Manga's",
        data: [popularMangas],
      },
      {
        title: "Featured Manga's",
        data: [featuredMangas],
      },
    ],
    [featuredMangas, popularMangas]
  );

  const handleRefresh = useCallback(async () => {
    await Promise.all([
      (popularMangaQuery.refetch(), featuredMangaQuery.refetch()),
    ]);
  }, []);

  return (
    <SectionList
      refreshing={
        popularMangaQuery.isRefetching || featuredMangaQuery.isRefetching
      }
      onRefresh={handleRefresh}
      sections={sections}
      ListHeaderComponent={BannersFlatList}
      renderSectionHeader={({ section }) => {
        const { headerStyles: sectionStyles } = createStyles(theme);

        return (
          <View style={sectionStyles.container}>
            <Text
              style={{
                fontWeight: "900",
              }}
            >
              {section.title}
            </Text>
            <TouchableOpacity style={sectionStyles.button}>
              <Entypo
                name="chevron-right"
                color={theme.colors.text}
                size={styles.sizes[4]}
              />
            </TouchableOpacity>
          </View>
        );
      }}
      renderItem={MangasFlatList}
    />
  );
};

const createStyles = (theme: Theme) => ({
  headerStyles: StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: styles.sizes[2],
      backgroundColor: theme.colors.background,
    },
    button: {
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: styles.sizes[2],
      padding: styles.sizes[2],
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  }),
});

export default HomeTab;
