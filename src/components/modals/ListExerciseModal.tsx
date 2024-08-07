import React, { Dispatch, SetStateAction, useContext } from "react";
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    useWindowDimensions,
    View,
} from "react-native";
import LayoutModal from "./LayoutModal";
import { ThemeContext } from "../../context/themeContext";
import exerciseData from "../../utils/exercises.data";
import AddExerciseCard from "../CreateRoutineScreen/AddExerciseCard";
import GenericButton from "../shared/GenericButton";
import { useTranslation } from "react-i18next";

interface Props {
    isVisible: boolean;
    setIsVisible: Dispatch<SetStateAction<boolean>>;
}

const ListExerciseModal = (props: Props) => {
    const { t } = useTranslation();
    const { theme } = useContext(ThemeContext);
    const { width, height } = useWindowDimensions();

    return (
        <>
            <StatusBar backgroundColor={theme.backdrop_color} />
            <LayoutModal isVisible={props.isVisible}>
                <View
                    style={{
                        ...styles.container,
                        backgroundColor: theme.bg_color,
                        height: height * 0.95,
                        width: width * 0.95,
                    }}
                >
                    <View
                        style={{
                            height: height * 0.75,
                        }}
                    >
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={styles.exerciesContainer}>
                                {exerciseData.map((exercise, index) => (
                                    <AddExerciseCard
                                        key={`${exercise.id}-${index}`}
                                        data={exercise}
                                    />
                                ))}
                            </View>
                        </ScrollView>
                    </View>

                    <View style={styles.buttonsContainer}>
                        <GenericButton
                            label={t("Modal:Add_Exercise")}
                            backgroundColor={theme.green}
                            onPress={() => {
                                props.setIsVisible(false);
                            }}
                        />
                        <GenericButton
                            label={t("Modal:Cancel")}
                            backgroundColor={theme.red}
                            onPress={() => {
                                props.setIsVisible(false);
                            }}
                        />
                    </View>
                    <View></View>
                </View>
            </LayoutModal>
        </>
    );
};

export default ListExerciseModal;

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        padding: 15,
        justifyContent: "space-between",
    },
    exerciesContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 10,
    },
    buttonsContainer: {
        gap: 10,
    },
});
