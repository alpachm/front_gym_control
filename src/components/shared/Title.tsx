import React, { ReactNode, useContext } from "react";
import { Text, useWindowDimensions } from "react-native";
import useGlobalStyles from "../../styles/useGlobalStyles";
import { ThemeContext } from "../../context/themeContext";

interface Props {
    children: ReactNode;
    color?: string;
    maxWidth?: 0.8 | 0.9;
}

const Title = (props: Props) => {
    const { theme } = useContext(ThemeContext);
    const { width } = useWindowDimensions();
    const globalStyles = useGlobalStyles();

    return (
        <Text
            style={{
                ...globalStyles.title,
                maxWidth: props.maxWidth ? width * props.maxWidth : width * 0.6,
                color: props.color ? props.color : theme.white,
            }}
        >
            {props.children}
        </Text>
    );
};

export default Title;
