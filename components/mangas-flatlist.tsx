import { FlatList, StyleSheet } from "react-native";
import React from "react";
import styles from "@/constants/styles";
import { Manga } from "@/types/mangadex";
import { MangaCard } from "./manga-card";

interface MangasFlatListProps {
  item: Manga[];
}

const MangasFlatList = ({ item: mangas }: MangasFlatListProps) => {
  const { rootStyles } = createStyles();

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={rootStyles.contentContainer}
      data={mangas}
      renderItem={({ item }) => <MangaCard manga={item} />}
    />
  );
};

const createStyles = () => ({
  rootStyles: StyleSheet.create({
    contentContainer: {
      gap: styles.sizes[2],
      paddingHorizontal: styles.sizes[2],
    },
  }),
});

export { MangasFlatList };
