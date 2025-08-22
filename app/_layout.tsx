import { FONTS } from "@/constants/Font";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import "./global.css";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    [FONTS.PoppinsBlack]: require("../assets/fonts/Poppins-Black.ttf"),
    [FONTS.PoppinsBold]: require("../assets/fonts/Poppins-Bold.ttf"),
    [FONTS.PoppinsMedium]: require("../assets/fonts/Poppins-Medium.ttf"),
    [FONTS.PoppinsRegular]: require("../assets/fonts/Poppins-Regular.ttf"),
  });

  useEffect (() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false
        }}
      />
    </GestureHandlerRootView>
  );
}
