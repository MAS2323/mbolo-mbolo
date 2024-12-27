import { Stack } from "expo-router";
import { useFonts } from "expo-font";

export default function RootLayout() {
  //Implementando las funetes
  useFonts({
    outfit: require("./../assets/fonts/ttf/Inter-BlackItalic.ttf"),
  });

  return (
    <Stack
      screenOptions={{
        headerTitle: "",
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="auth" options={{ headerShown: false }} />
    </Stack>
  );
}
