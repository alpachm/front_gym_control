import React, { useContext } from "react";
import { TextInput } from "react-native";
import { ThemeContext } from "../../context/themeContext";
import useGlobalStyles from "../../styles/useGlobalStyles";

interface Props {
    placeholder: string;
    onChange: () => void;
    value: string;
}

const GenericInput = (props: Props) => {
    const { theme } = useContext(ThemeContext);
    const { input } = useGlobalStyles();

    return (
        <TextInput
            style={{
                ...input,
                backgroundColor: theme.bg_modal,
                borderColor: theme.text_color,
                color: theme.text_color,
            }}
            value={props.value}
            placeholder={props.placeholder}
            placeholderTextColor={theme.text_color}
            cursorColor={theme.primary}
            selectionColor={theme.primary}
            onChangeText={props.onChange}
        />
    );
};

export default GenericInput;
