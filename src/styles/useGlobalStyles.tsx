import { useContext } from "react";
import { StyleSheet } from "react-native";
import { ThemeContext } from "../context/themeContext";


const useGlobalStyles = () => {
    const {theme} = useContext(ThemeContext);

    const global_styles = StyleSheet.create({
        title: {
            fontFamily: "Inter_900Black",
            fontSize: 30,
            textTransform: "uppercase",
            color: theme.text_color
        }
    });
    
    return global_styles;
};

export default useGlobalStyles;