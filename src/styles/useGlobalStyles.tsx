import { useContext } from "react";
import { StyleSheet } from "react-native";
import { ThemeContext } from "../context/themeContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";


const useGlobalStyles = () => {
    const {theme} = useContext(ThemeContext);
    const {top} = useSafeAreaInsets();

    const global_styles = StyleSheet.create({
        layout_container: {
            flex: 1,
            paddingTop: top,
            backgroundColor: theme.bg_color
        },
        title: {
            fontFamily: "Inter_900Black",
            fontSize: 30,
            textTransform: "uppercase",
            color: theme.white
        },
        caption: {
            fontFamily: "Inter_100Thin",
            color: theme.white
        }
    });
    
    return global_styles;
};

export default useGlobalStyles;