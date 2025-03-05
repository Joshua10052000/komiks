import * as ExpoNetwork from "expo-network";
import { useColorScheme } from "react-native";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router/stack";
import { StatusBar } from "expo-status-bar";
import {
  onlineManager,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import getColors from "@/constants/colors";
import { Text } from "@/components/ui/text";

const RootLayout = () => {
  const colorScheme = useColorScheme();
  const [queryClient] = useState(() => new QueryClient());

  const theme = useMemo(
    () => ({
      colors: getColors(colorScheme === "dark"),
      dark: colorScheme === "dark",
      fonts: DefaultTheme.fonts,
    }),
    [colorScheme]
  );

  useEffect(() => {
    onlineManager.setEventListener((setOnline) => {
      const eventSubscription = ExpoNetwork.addNetworkStateListener((state) => {
        setOnline(state.isConnected ?? Boolean(state.isInternetReachable));
      });

      return () => {
        eventSubscription.remove();
      };
    });
  }, []);

  if (!onlineManager.isOnline()) {
    return <Text>No internet connection</Text>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={theme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="manga/[id]" options={{ title: "" }} />
          <Stack.Screen name="chapter/[id]" options={{ title: "" }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default RootLayout;
