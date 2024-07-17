import React, { useContext } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { ThemeContext } from "../../context/themeContext";

interface Props {
    label: string;
    onPress: () => void;
    backgroundColor: string;
}

const GenericButton = (props: Props) => {
    const { theme } = useContext(ThemeContext);

    return (
        <Pressable
            onPress={props.onPress}
            style={({ pressed }) => [
                {
                    ...styles.button,
                    backgroundColor: props.backgroundColor,
                    opacity: pressed ? 0.5 : 1,
                },
            ]}
        >
            <Text style={{ ...styles.buttonText, color: theme.white }}>
                {props.label.toLowerCase()}
            </Text>
        </Pressable>
    );
};

export default GenericButton;

const styles = StyleSheet.create({
    button: {
        padding: 15,
        borderRadius: 6,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        fontFamily: "Inter_700Bold",
        fontSize: 15,
    },
});
