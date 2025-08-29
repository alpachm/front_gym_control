import React, { useContext, useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import days from "../../utils/days";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Day from "./Day";
import { ThemeContext } from "../../context/themeContext";
import TableHome from "./TableHome";
import EnterWeightModal from "../modals/EnterWeightModal";
import WithoutRoutineModal from "../modals/WithoutRoutineModal";
import { UserContext } from "../../context/userContext";
import LoadingScreen from "../shared/LoadingScreen";
import GetRoutinesService from "../../services/GetRoutinesService";
import { getStorageData } from "../../utils/asyncStorage";
import {
    IGetRoutinesResponse,
    Routine,
} from "../../interfaces/GetRoutinesResponse.interface";
import { EApiStatusResponse } from "../../enums/apiResponse.enum";
import { useTranslation } from "react-i18next";
import NoContentMessage from "./NoContentMessage";
import ExerciseEntity from "../../entities/exercise.entity";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootAppStackParams } from "../../navigation/AppStackNavigator";
import { RoutineExercise } from "../../interfaces/GetRoutinesResponse.interface";

const ContentHomeScreen = () => {
    const { theme } = useContext(ThemeContext);
    const { currentDay, routinesData, setRoutinesData } =
        useContext(UserContext);
    const { t } = useTranslation();
    const navigation = useNavigation<NavigationProp<RootAppStackParams>>();
    const [selectedDay, setSelectedDay] = useState(0);
    const [showEnterWeightModal, setShowEnterWeightModal] = useState(false);
    const [showWithoutRoutineModal, setShowWithoutRoutineModal] =
        useState(false);
    const [contentIsLoading, setContentIsLoading] = useState(true);
    const [exercises, setExercises] = useState<ExerciseEntity[]>([]);
    const [noRoutines, setNoRoutines] = useState(false);
    const [daysWithRoutine, setDaysWithRoutine] = useState<number[]>([]);
    const [daysWithExercise, setDaysWithExercise] = useState<number[]>([]);

    const getRoutines = async (currentDay: string) => {
        const user = await getStorageData("user");
        const userData = await JSON.parse(user!);

        days.forEach((day, index) => {
            const abbreviatedDay = day.label.slice(0, 3);

            if (abbreviatedDay === currentDay) {
                setSelectedDay(day.value);
                setContentIsLoading(false);
            }
        });

        await GetRoutinesService(userData.id)
            .then((res) => {
                if (res.status === EApiStatusResponse.ERROR) {
                    setNoRoutines(true);
                    setShowWithoutRoutineModal(true);
                }

                if (res.status === EApiStatusResponse.SUCCESS) {
                    setRoutinesData(res);
                    getExercisesByDay(res);

                    const arrayDays = res.routines.map(
                        (routine) => routine.fk_day
                    );
                    const arrayDaysWithExercise = res.routines.map(
                        (routine) => {
                            if (routine.RoutineExercises.length) {
                                return routine.fk_day;
                            } else {
                                return 0;
                            }
                        }
                    );

                    setDaysWithRoutine(arrayDays);
                    setDaysWithExercise(arrayDaysWithExercise);
                }
            })
            .catch((error) => {
                console.error(
                    "Error when trying to obtain the routines " + error
                );
            });
    };

    const getExercisesByDay = (routinesData: IGetRoutinesResponse) => {
        const exercisesArray: ExerciseEntity[] = [];
        const exercisePerDay: Routine | undefined = routinesData?.routines.find(
            (routine) => routine.fk_day === selectedDay
        );
        exercisePerDay?.RoutineExercises.forEach((exercise) => {
            const toExercise: ExerciseEntity = {
                pk_exercise: exercise.Exercise.pk_exercise,
                name: exercise.Exercise.name,
                last_weight: exercise.Exercise.weight ?? 0,
                weight: exercise.Exercise.weight ?? 0,
                img_url: exercise.Exercise.img_url,
                repetitions: exercise.Exercise.repetitions ?? 0,
                status: exercise.Exercise.status,
                completed: false,
            };

            exercisesArray.push(toExercise);
        });
        setExercises(exercisesArray);
    };

    useEffect(() => {
        if (currentDay) {
            getRoutines(currentDay);
        }
    }, [currentDay]);

    useEffect(() => {
        if (selectedDay && Object.keys(routinesData).length > 0) {
            getExercisesByDay(routinesData);
        }
    }, [selectedDay, routinesData]);

    const renderDaysOptions = () => {
        return (
            <View style={styles.daysContainer}>
                {days.map((day, index) => (
                    <Pressable
                        key={day.value}
                        style={({ pressed }) => [
                            {
                                ...styles.button,
                                borderColor: theme.primary,
                                backgroundColor:
                                    selectedDay === day.value
                                        ? theme.primary
                                        : "transparent",
                                opacity: pressed ? 0.5 : 1,
                            },
                        ]}
                        onPress={() => setSelectedDay(day.value)}
                    >
                        <Day day={day} isActive={selectedDay === day.value} />
                    </Pressable>
                ))}
            </View>
        );
    };

    const renderExerciseList = () => {
        return (
            <View style={styles.exerciseListContainer}>
                {exercises.map((exercise) => (
                    <TableHome
                        key={exercise.pk_exercise}
                        exercise={exercise}
                        setShowModal={setShowEnterWeightModal}
                    />
                ))}
            </View>
        );
    };

    const renderNoContentMessage = () => {
        if (noRoutines) {
            return (
                <NoContentMessage
                    title={t("HomeScreen:No_Routines")}
                    buttonLabel={t("RoutineScreen:Create_Routine")}
                    onPress={() => navigation.navigate("CreateRoutine", {})}
                />
            );
        }

        if (!daysWithRoutine.includes(selectedDay)) {
            return (
                <NoContentMessage
                    title={t("HomeScreen:No_Routine_Today")}
                    buttonLabel={t("RoutineScreen:Create_Routine")}
                    onPress={() => navigation.navigate("CreateRoutine", {})}
                />
            );
        }

        if (!daysWithExercise.includes(selectedDay)) {
            return (
                <NoContentMessage
                    title={t("ExerciseScreen:No_Exercises_Today")}
                    buttonLabel={t("ExerciseScreen:Create_Exercise")}
                    onPress={() => navigation.navigate("CreateExercise", {})}
                    additionalButton
                    buttonLabelAddBtn={t("ExerciseScreen:Assign_Exercise")}
                    onPressAddBtn={() => navigation.navigate("Exercise")}
                />
            );
        }
    };

    return contentIsLoading ? (
        <LoadingScreen />
    ) : (
        <ScrollView>
            {renderDaysOptions()}
            {noRoutines ||
            !daysWithRoutine.includes(selectedDay) ||
            !daysWithExercise.includes(selectedDay)
                ? renderNoContentMessage()
                : renderExerciseList()}
            <EnterWeightModal
                isVisible={showEnterWeightModal}
                setIsVisible={setShowEnterWeightModal}
            />
            <WithoutRoutineModal
                isVisible={showWithoutRoutineModal}
                setIsVisible={setShowWithoutRoutineModal}
            />
        </ScrollView>
    );
};

export default ContentHomeScreen;

const styles = StyleSheet.create({
    daysContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 100,
    },
    button: {
        width: 40,
        height: 40,
        borderRadius: 50,
        borderWidth: 1.5,
        justifyContent: "center",
        alignItems: "center",
    },
    exerciseListContainer: {
        marginTop: 45,
        paddingBottom: 120,
        gap: 15,
    },
});
