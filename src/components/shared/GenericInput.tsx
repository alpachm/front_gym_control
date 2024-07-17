import React, { useContext } from "react";
import { TextInput } from "react-native";
import { ThemeContext } from "../../context/themeContext";
import useGlobalStyles from "../../styles/useGlobalStyles";

interface Props {
    placeholder: string;
    onChange: () => void;
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
            placeholder={props.placeholder}
            placeholderTextColor={theme.text_color}
            cursorColor={theme.primary}
            selectionColor={theme.primary}
            onChange={props.onChange}
        />
    );
};

export default GenericInput;
