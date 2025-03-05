import {
  Pressable,
  ScaledSize,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { Image, useImage } from "expo-image";
import { Manga } from "@/types/mangadex";
import { useCallback } from "react";
import { useRouter } from "expo-router";
import { Theme, useTheme } from "@react-navigation/native";
import styles from "@/constants/styles";
import { Text } from "@/components/ui/text";

interface MangaCardProps {
  manga: Manga;
}

const MangaCard = ({ manga }: MangaCardProps) => {
  const router = useRouter();
  const theme = useTheme();
  const windowDimensions = useWindowDimensions();
  const foundCover = manga.relationships.find(
    (relationship) => relationship.type === "cover_art"
  );

  const imageUrl = foundCover
    ? `https://uploads.mangadex.org/covers/${manga.id}/${foundCover?.attributes?.fileName}.512.jpg`
    : require("@/assets/images/placeholder.png"); // [TODO]: Change to not found
  const image = useImage(imageUrl, {
    onError: (error) => {
      console.error(error.message);
    },
  });

  const handlePress = useCallback(() => {
    router.push({ pathname: "/manga/[id]", params: { id: manga.id } });
  }, []);

  const { itemStyles } = createStyles(windowDimensions, theme);

  return (
    <Pressable style={itemStyles.container} onPress={handlePress}>
      <View style={itemStyles.imageContainer}>
        <Image
          style={itemStyles.image}
          contentFit="cover"
          source={image}
          placeholder={require("@/assets/images/placeholder.png")}
        />
      </View>
      <Text
        style={itemStyles.title}
        numberOfLines={2}
        textBreakStrategy="balanced"
      >
        {manga.attributes.title.en ?? manga.attributes.title["ja-ro"]}
      </Text>
    </Pressable>
  );
};

const createStyles = (windowDimensions: ScaledSize, theme: Theme) => ({
  itemStyles: StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "column",
      gap: styles.sizes[2],
      width: windowDimensions.width / 3 - styles.sizes[2] - 2.5,
    },
    imageContainer: {
      overflow: "hidden",
      borderRadius: styles.sizes[2],
      position: "relative",
    },
    image: {
      height: 200,
      width: "100%",
    },
    statusContainer: {
      position: "absolute",
      bottom: styles.sizes[1],
      left: styles.sizes[1],
      padding: styles.sizes[1],
      backgroundColor: theme.colors.background,
      borderRadius: styles.sizes[1],
    },
    status: {
      fontSize: styles.sizes[3],
      textTransform: "capitalize",
      fontWeight: "bold",
    },
    title: {
      fontSize: styles.sizes[3],
      textAlign: "center",
    },
  }),
});

export { MangaCard };
