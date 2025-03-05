import {
  ScaledSize,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import { Image, useImage } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import styles from "@/constants/styles";
import { useTheme } from "@react-navigation/native";

interface BannerImageProps {
  imageUrl: any;
}

const BannerImage = ({ imageUrl }: BannerImageProps) => {
  const theme = useTheme();
  const windowDimensions = useWindowDimensions();
  const image = useImage(imageUrl, {
    onError: (error) => {
      console.error(error);
    },
  });
  const { itemStyles } = createStyles(windowDimensions);

  return (
    <View style={itemStyles.container}>
      <Image
        style={itemStyles.image}
        source={image}
        placeholder={require("@/assets/images/placeholder.png")}
      />
      <LinearGradient
        end={{ x: 0, y: 0 }}
        start={{ x: 0, y: 2 }}
        style={itemStyles.linear}
        colors={[theme.colors.primary, "transparent"]}
      />
    </View>
  );
};

const createStyles = (windowDimensions: ScaledSize) => ({
  itemStyles: StyleSheet.create({
    container: {
      position: "relative",
    },
    image: {
      width: windowDimensions.width,
      height: styles.sizes[96],
    },
    positionContainer: {
      position: "absolute",
      bottom: 0,
      right: 0,
      padding: styles.sizes[2],
    },
    position: {
      fontSize: styles.sizes[4],
      fontWeight: "900",
    },
    linear: {
      height: styles.sizes[50],
      position: "absolute",
      bottom: 0,
      right: 0,
      left: 0,
    },
  }),
});

export { BannerImage };
