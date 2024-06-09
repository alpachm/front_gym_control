import { useFonts } from "expo-font";
import React, { useCallback, useEffect } from "react";
import { Text, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import {
  Inter_100Thin,
  Inter_400Regular,
  Inter_800ExtraBold,
  Inter_900Black
} from "@expo-google-fonts/inter";
import { useTranslation } from "react-i18next";
import useGlobalStyles from "../../styles/useGlobalStyles";

const StartScreen = () => {
  const {t} = useTranslation();
  const globalStyle = useGlobalStyles();
  const [loadedFonts] = useFonts({
    Inter_100Thin,
    Inter_400Regular,
    Inter_800ExtraBold,
    Inter_900Black
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
      <Text style={globalStyle.title}>{t("Start_Screen:Title")}</Text>
    </View>
  );
};

export default StartScreen;
