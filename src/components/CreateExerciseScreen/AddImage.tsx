import React, { useContext } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import IconImage from "../../icons/IconImage";
import IconCamera from "../../icons/IconCamera";
import { ThemeContext } from "../../context/themeContext";

const AddImage = () => {
    const { theme } = useContext(ThemeContext);

    return (
        <View
            style={{
                ...styles.container,
                backgroundColor: theme.bg_modal,
                borderColor: theme.text_color,
            }}
        >
            <Pressable
                style={({ pressed }) => [
                    { ...styles.box, opacity: pressed ? 0.5 : 1 },
                ]}
            >
                <IconImage width={60} height={60} />
            </Pressable>
            <Pressable
                style={({ pressed }) => [
                    {
                        ...styles.box,
                        borderLeftWidth: 0.3,
                        borderColor: theme.text_color,
                        opacity: pressed ? 0.5 : 1,
                    },
                ]}
            >
                <IconCamera width={60} height={60} />
            </Pressable>
        </View>
    );
};

export default AddImage;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        height: 145,
        width: "100%",
        borderWidth: 0.2,
    },
    box: {
        width: "50%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
});
