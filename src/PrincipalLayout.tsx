import React, { useContext } from "react";
import {
  ColorSchemeName,
  ImageBackground,
  Pressable,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import useGlobalStyles from "./styles/useGlobalStyles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import IconLeftArrow from "./icons/IconLeftArrow";
import { ThemeContext } from "./context/themeContext";
import { useNavigation } from "@react-navigation/native";

interface Props {
  children: React.ReactNode;
  status: "Start" | "Login" | "Register" | "Home" | "Other";
  backButton?: boolean;
}

const PrincipalLayout = (props: Props) => {
  const { theme } = useContext(ThemeContext);
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const { top } = useSafeAreaInsets();
  const globalStyles = useGlobalStyles();

  const isUnauthorizedScreen = () => {
    if (
      props.status === "Start" ||
      props.status === "Login" ||
      props.status === "Register"
    ) {
      return true;
    } else {
      return false;
    }
  };

  const renderBackArrow = () => {
    return (
      <View style={styles.arrow}>
        {props.backButton ? (
          <Pressable
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.5 : 1,
              },
            ]}
            onPress={() => navigation.goBack()}
          >
            <IconLeftArrow width={40} height={40} fill={theme.white} />
          </Pressable>
        ) : null}
      </View>
    );
  };

  const getImageBackground = (status: string) => {
    switch (status) {
      case "Start":
        return require("./../assets/bg_start.png");
      case "Login":
        return require("./../assets/bg_login.png");
      case "Register":
        return require("./../assets/bg_register.png");
      default:
        return require("./../assets/bg_login.png");
    }
  };

  const getHomeImageBackground = (colorScheme: ColorSchemeName) => {
    return colorScheme === "light"
      ? require("./../assets/bg_home_1.png")
      : require("./../assets/bg_home_2.png");
  };

  const renderImageBackground = () => {
    const imagePath = getImageBackground(props.status);
    return (
      <ImageBackground
        style={{
          ...styles.imageBackground,
          ...styles.globalPadding,
          paddingTop: top,
          backgroundColor: theme.black,
        }}
        source={imagePath}
      >
        {renderBackArrow()}
        {props.children}
      </ImageBackground>
    );
  };

  const renderHomeImageBackground = () => {
    const imagePath = getHomeImageBackground(colorScheme);
    return (
      <ImageBackground
        source={imagePath}
        style={{
          ...styles.homeImageBackground,
          backgroundColor: theme.bg_color,
        }}
      >
        {props.children}
      </ImageBackground>
    );
  };

  if (isUnauthorizedScreen()) {
    return renderImageBackground();
  }

  if (props.status === "Home") {
    return renderHomeImageBackground();
  }

  return (
    <View style={{ ...globalStyles.layout_container, ...styles.globalPadding }}>
      {renderBackArrow()}
      {props.children}
    </View>
  );
};

export default PrincipalLayout;

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
  },
  globalPadding: {
    padding: 20,
  },
  homeImageBackground: {
    flex: 1,
    width: "100%",
    height: 360,
  },
  view: {},
  arrow: {
    height: 40,
    marginBottom: 10,
  },
});
