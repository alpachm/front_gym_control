import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../shared/Button";
import { ThemeContext } from "../../context/themeContext";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootAppStackParams } from "../../navigation/AppStackNavigator";

interface Props {
    title: string;
    buttonLabel: string;
}

const NoContentMessage = (props: Props) => {
    const { theme } = useContext(ThemeContext);
    const navigation = useNavigation<NavigationProp<RootAppStackParams>>();

    return (
        <View style={styles.noRoutineMessageContainer}>
            <Text
                style={{
                    ...styles.noRoutineMessageTxt,
                    color: theme.text_color,
                }}
            >
                {props.title}
            </Text>
            <Button
                background={theme.green}
                label={props.buttonLabel}
                iconWidth={20}
                iconHeight={20}
                width={130}
                height={50}
                onPress={() => navigation.navigate("CreateRoutine", {})}
            />
        </View>
    );
};

export default NoContentMessage;

const styles = StyleSheet.create({
    noRoutineMessageContainer: {
        flex: 1,
        height: 270,
        gap: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    noRoutineMessageTxt: {
        fontFamily: "Inter_800ExtraBold",
        textTransform: "uppercase",
        fontSize: 20,
    },
});
