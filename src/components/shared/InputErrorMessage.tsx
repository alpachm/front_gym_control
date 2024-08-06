import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ThemeContext } from "../../context/themeContext";

interface Props {
    message: string;
}

const InputErrorMessage = (props: Props) => {
    const { theme } = useContext(ThemeContext);

    return (
        <View style={styles.errorTxtContainer}>
            <Text style={{ ...styles.errorTxt, color: theme.red_error }}>
                {props.message}
            </Text>
        </View>
    );
};

export default InputErrorMessage;

const styles = StyleSheet.create({
    errorTxtContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    errorTxt: {
        marginTop: -10,
        fontFamily: "Inter_200ExtraLight",
    },
});
