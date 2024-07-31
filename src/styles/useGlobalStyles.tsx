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
        confirmModal: {
            width: "80%",
            borderRadius: 10,
            padding: 20,
            gap: 5,
            alignItems: "center",
            backgroundColor: theme.white,
        },
        iconConfirmModal: {
            justifyContent: "center",
            alignItems: "center",
            height: 50,
            width: 50,
            borderRadius: 50,
        },
        txtConfirmModal: {
            fontFamily: "Inter_400Regular",
            fontSize: 22,
            textAlign: "center",
            color: theme.black,
        },
    });

    return global_styles;
};

export default useGlobalStyles;
