import { useAssets } from "expo-asset";
import { FlatList } from "react-native";
import { BannerImage } from "./banner-image";

const BannersFlatList = () => {
  const [assets, error] = useAssets([
    require("@/assets/images/placeholder.png"),
    require("@/assets/images/placeholder.png"),
    require("@/assets/images/placeholder.png"),
    require("@/assets/images/placeholder.png"),
    require("@/assets/images/placeholder.png"),
  ]);

  if (error || !assets) {
    return null;
  }

  return (
    <FlatList
      horizontal
      pagingEnabled
      data={assets}
      renderItem={({ item }) => <BannerImage imageUrl={item} />}
    />
  );
};

export { BannersFlatList };
