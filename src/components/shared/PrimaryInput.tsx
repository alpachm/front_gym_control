import React, { useContext, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { SvgProps } from "react-native-svg";
import { ThemeContext } from "../../context/themeContext";

interface Props {
    placeholder: string;
    icon: (props: SvgProps) => React.JSX.Element;
    onChenge: (e: string) => void;
    inputMode: "text" | "numeric" | "email";
    secureTextEntry?: boolean;
    value?: string;
    onBlur?: () => void;
    isError?: boolean;
}

const PrimaryInput = (props: Props) => {
    const { theme } = useContext(ThemeContext);
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View
            style={{
                ...styles.view,
                backgroundColor: theme.bg_primary_input,
                borderColor: props.isError ? theme.red_error : "transparent",
            }}
        >
            <props.icon
                width={30}
                height={30}
                fill={theme.white}
                opacity={0.2}
            />
            <TextInput
                style={{
                    ...styles.input,
                    color: theme.white,
                    opacity: props.value ? 1 : 0.5,
                }}
                value={props.value}
                placeholder={props.placeholder}
                placeholderTextColor={theme.white}
                cursorColor={theme.primary}
                selectionColor={theme.primary}
                onChangeText={props.onChenge}
                onBlur={props.onBlur && props.onBlur}
                inputMode={props.inputMode}
                onFocus={() => setIsFocused(true)}
                secureTextEntry={props.secureTextEntry}
                autoComplete="off"
            />
        </View>
    );
};

export default PrimaryInput;

const styles = StyleSheet.create({
    view: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingHorizontal: 14,
        gap: 20,
        borderRadius: 10,
        borderWidth: 1,
        width: "100%",
        height: 55,
        opacity: 0.77,
    },
    input: {
        flex: 1,
        fontFamily: "Inter_100Thin",
        fontSize: 18,
        opacity: 0.5,
        textTransform: "lowercase",
    },
});
