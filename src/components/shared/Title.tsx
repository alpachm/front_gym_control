import React, { ReactNode, useContext } from "react";
import { Text } from "react-native";
import useGlobalStyles from "../../styles/useGlobalStyles";
import { ThemeContext } from "../../context/themeContext";

interface Props {
    children: ReactNode;
    color?: string;
}

const Title = (props: Props) => {
    const { theme } = useContext(ThemeContext);
    const globalStyles = useGlobalStyles();

    return (
        <Text
            style={{
                ...globalStyles.title,
                color: props.color ? props.color : theme.white,
            }}
        >
            {props.children}
        </Text>
    );
};

export default Title;
