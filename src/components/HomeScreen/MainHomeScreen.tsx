import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import Subtitle from "../shared/Subtitle";
import { useTranslation } from "react-i18next";
import Button from "../shared/Button";
import { ThemeContext } from "../../context/themeContext";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootAppStackParams } from "../../navigation/AppStackNavigator";

const MainHomeScreen = () => {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation<NavigationProp<RootAppStackParams>>();

  const styles = StyleSheet.create({
    container: { alignItems: "flex-start", gap: 27 },
    buttonsContainer: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "center",
      gap: 25,
      alignItems: "center",
    },
    text: { fontFamily: "Inter_400Regular", color: theme.white, fontSize: 17 },
  });

  return (
    <View style={styles.container}>
      <Subtitle>{t("HomeScreen:Subtitle")}</Subtitle>
      <View style={styles.buttonsContainer}>
        <Button
          label={t("HomeScreen:Routines")}
          onPress={() => navigation.navigate("Routine")}
          width={130}
          height={50}
        />
        <Button
          label={t("HomeScreen:Exercises")}
          onPress={() => navigation.navigate("Exercise")}
          width={130}
          height={50}
        />
      </View>
      <Text style={styles.text}>{t("HomeScreen:Take_Control")}</Text>
    </View>
  );
};

export default MainHomeScreen;
