import * as ExpoNetwork from "expo-network";
import { Text, useColorScheme } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router/stack";
import { StatusBar } from "expo-status-bar";
import {
  onlineManager,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useEffect, useState } from "react";

const RootLayout = () => {
  const colorScheme = useColorScheme();
  const [queryClient] = useState(() => new QueryClient());

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
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
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
