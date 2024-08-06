import React, { useContext } from "react";
import { ActivityIndicator, StatusBar, StyleSheet, View } from "react-native";
import ReactNativeModal from "react-native-modal";
import { ThemeContext } from "../../context/themeContext";

const LoadingScreen = () => {
    const { theme } = useContext(ThemeContext);

    return (
        <>
            <StatusBar backgroundColor={theme.backdrop_color} />
            <ReactNativeModal
                isVisible
                backdropColor={theme.black}
                backdropOpacity={0.8}
                animationIn={"bounceInDown"}
                style={styles.container}
            >
                <ActivityIndicator color={theme.primary} size={60} />
            </ReactNativeModal>
        </>
    );
};

export default LoadingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
