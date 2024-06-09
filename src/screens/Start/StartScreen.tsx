import { useFonts } from "expo-font";
import React, { useCallback, useEffect } from "react";
import { Text, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { global_styles } from "../../styles/global.styles";
import {
  Inter_100Thin,
  Inter_400Regular,
  Inter_800ExtraBold,
} from "@expo-google-fonts/inter";

const StartScreen = () => {
  const [loadedFonts] = useFonts({
    Inter_100Thin,
    Inter_400Regular,
    Inter_800ExtraBold,
  });

  useEffect(() => {
    const prepare = async () => {
      await SplashScreen.preventAutoHideAsync();
    };
    prepare();
  }, []);

  const onLayout = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, [loadedFonts]);

  if (!loadedFonts) return null;

  return (
    <View onLayout={onLayout}>
      <Text style={global_styles.title}>StartScreen</Text>
    </View>
  );
};

export default StartScreen;
