import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, Text } from "react-native";
import { ThemeContext } from "../../context/themeContext";

interface Props {
    label: "Create" | "Enter" | "Cancel" | "Add_Exercise";
    onPress: () => void;
    isAddExerciseModal?: boolean;
}

const ModalButton = (props: Props) => {
    const { t } = useTranslation();
    const { theme } = useContext(ThemeContext);

    return (
        <Pressable
            style={({ pressed }) => [
                {
                    ...styles.button,
                    width: props.isAddExerciseModal ? "100%" : 110,
                    backgroundColor:
                        props.label === "Cancel" ? theme.red : theme.green,
                    opacity: pressed ? 0.5 : 1,
                },
            ]}
            onPress={props.onPress}
        >
            <Text style={{ ...styles.text, color: theme.white }}>
                {t(`Modal:${props.label}`).toLowerCase()}
            </Text>
        </Pressable>
    );
};

export default ModalButton;

const styles = StyleSheet.create({
    button: {
        borderRadius: 5,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontFamily: "Inter_700Bold",
    },
});
