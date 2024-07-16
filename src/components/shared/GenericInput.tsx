import React, { useContext } from "react";
import { StyleSheet, TextInput } from "react-native";
import { ThemeContext } from "../../context/themeContext";

interface Props {
    placeholder: string;
    onChange: () => void;
}

const GenericInput = (props: Props) => {
    const { theme } = useContext(ThemeContext);

    return (
        <TextInput
            style={{
                ...styles.input,
                backgroundColor: theme.bg_modal,
                borderColor: theme.text_color,
                color: theme.text_color,
            }}
            placeholder={props.placeholder}
            placeholderTextColor={theme.text_color}
            cursorColor={theme.primary}
            selectionColor={theme.primary}
            onChange={props.onChange}
        />
    );
};

export default GenericInput;

const styles = StyleSheet.create({
    input: {
        borderWidth: 0.5,
        height: 35,
        paddingHorizontal: 10,
        fontFamily: "Inter_300Light",
    },
});
