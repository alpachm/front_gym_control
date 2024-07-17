import { useContext } from "react";
import { StyleSheet } from "react-native";
import { ThemeContext } from "../context/themeContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const useGlobalStyles = () => {
    const { theme } = useContext(ThemeContext);
    const { top } = useSafeAreaInsets();

    const global_styles = StyleSheet.create({
        layout_container: {
            flex: 1,
            paddingTop: top,
            backgroundColor: theme.bg_color,
        },
        title: {
            fontFamily: "Inter_900Black",
            fontSize: 30,
            textTransform: "uppercase",
        },
        caption: {
            fontFamily: "Inter_100Thin",
            color: theme.white,
        },
        text_callToAction: {
            fontFamily: "Inter_100Thin",
            fontSize: 16,
            textAlign: "center",
        },
        text_or: {
            fontFamily: "Inter_100Thin",
            fontSize: 16,
            opacity: 0.7,
            color: theme.white,
            textTransform: "lowercase",
        },
        input: {
            borderWidth: 0.2,
            height: 45,
            paddingHorizontal: 10,
            fontFamily: "Inter_300Light",
        },
    });

    return global_styles;
};

export default useGlobalStyles;
