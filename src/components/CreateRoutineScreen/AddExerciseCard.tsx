import React, { useContext } from "react";
import {
    Image,
    ImageBackground,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import ExerciseEntity from "../../entities/exercise.entity";
import { ThemeContext } from "../../context/themeContext";
import { toCapitalize } from "../../utils/formatText";

interface Props {
    data: ExerciseEntity;
}

const AddExerciseCard = (props: Props) => {
    const { theme } = useContext(ThemeContext);

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
            <Image source={{ uri: props.data.img_url }} style={styles.image} />
            <Text style={{ ...styles.text, color: theme.text_color }}>
                {toCapitalize(props.data.name)}
            </Text>
        </Pressable>
    );
};

export default AddExerciseCard;

const styles = StyleSheet.create({
    container: {
        width: 150,
        height: 140,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
    },
    image: {
        width: 150 * 0.9,
        height: 100,
        borderRadius: 10,
    },
    text: {
        fontFamily: "Inter_400Regular",
        fontSize: 12,
    },
});
