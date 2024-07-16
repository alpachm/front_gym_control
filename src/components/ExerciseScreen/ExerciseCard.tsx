import React, { useContext } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import ExerciseEntity from "../../entities/exercise.entity";
import IconEdit from "../../icons/IconEdit";
import IconDelete from "../../icons/IconDelete";
import { ThemeContext } from "../../context/themeContext";
import { toCapitalize } from "../../utils/formatText";

interface Props {
    data: ExerciseEntity;
}

const ExerciseCard = (props: Props) => {
    const { theme } = useContext(ThemeContext);

    const renderButtons = () => {
        return (
            <View style={styles.buttonsContainer}>
                <Pressable
                    style={({ pressed }) => [
                        {
                            ...styles.button,
                            backgroundColor: theme.primary,
                            opacity: pressed ? 0.5 : 1,
                        },
                    ]}
                >
                    <IconEdit width={15} height={15} fill={theme.white} />
                </Pressable>
                <Pressable
                    style={({ pressed }) => [
                        {
                            ...styles.button,
                            backgroundColor: theme.red,
                            opacity: pressed ? 0.5 : 1,
                        },
                    ]}
                >
                    <IconDelete width={15} height={15} fill={theme.white} />
                </Pressable>
            </View>
        );
    };

    return (
        <Pressable
            style={({ pressed }) => [
                {
                    ...styles.container,
                    backgroundColor: props.data.completed
                        ? theme.green
                        : theme.bg_modal,
                    opacity: pressed ? 0.5 : 1,
                },
            ]}
        >
            <View style={styles.leftContainer}>
                <Image
                    source={{ uri: props.data.img_url }}
                    style={styles.image}
                />
                <View style={styles.nameContainer}>
                    <Text style={{ ...styles.text, color: theme.text_color }}>
                        {toCapitalize(props.data.name)}
                    </Text>
                </View>
            </View>
            {renderButtons()}
        </Pressable>
    );
};

export default ExerciseCard;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 7,
        borderRadius: 10,
    },
    leftContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 15,
    },
    image: {
        width: 95,
        height: 70,
        borderRadius: 10,
    },
    nameContainer: {
        height: "100%",
        justifyContent: "flex-start",
    },
    text: {
        fontFamily: "Inter_400Regular",
        fontSize: 16,
    },
    buttonsContainer: {
        height: "100%",
        flexDirection: "row",
        alignItems: "flex-end",
        gap: 10,
    },
    button: {
        borderRadius: 50,
        width: 30,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
    },
});
