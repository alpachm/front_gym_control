import React, { ReactNode, useContext } from "react";
import ReactNativeModal from "react-native-modal";
import { ThemeContext } from "../../context/themeContext";
import { StyleSheet } from "react-native";

interface Props {
    children: ReactNode;
    isVisible: boolean;
}

const LayoutModal = (props: Props) => {
    const { theme } = useContext(ThemeContext);

    return (
        <ReactNativeModal
            isVisible={props.isVisible}
            backdropColor={theme.black}
            backdropOpacity={0.8}
            animationIn={"bounceInDown"}
            style={styles.container}
        >
            {props.children}
        </ReactNativeModal>
    );
};

export default LayoutModal;

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
    },
});
