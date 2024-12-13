import React, {
    Dispatch,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from "react";
import { ScrollView } from "react-native-gesture-handler";
import days from "../../utils/days";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Day from "./Day";
import { ThemeContext } from "../../context/themeContext";
import exerciseData from "../../utils/exercises.data";
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
import Button from "../shared/Button";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { RootAppStackParams } from "../../navigation/AppStackNavigator";
import NoContentMessage from "./NoContentMessage";
import ExerciseEntity from "../../entities/exercise.entity";

const ContentHomeScreen = () => {
    const { theme } = useContext(ThemeContext);
    const { currentDay } = useContext(UserContext);
    const navigation = useNavigation<NavigationProp<RootAppStackParams>>();
    const { t } = useTranslation();
    const [selectedDay, setSelectedDay] = useState(0);
    const [showEnterWeightModal, setShowEnterWeightModal] = useState(false);
    const [showWithoutRoutineModal, setShowWithoutRoutineModal] =
        useState(false);
    const [contentIsLoading, setContentIsLoading] = useState(true);
    const [routinesData, setRoutinesData] = useState<IGetRoutinesResponse>();
    const [exercises, setExercises] = useState<ExerciseEntity[]>([]);
    const [noRoutines, setNoRoutines] = useState(false);

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
                }
            })
            .catch((error) => {
                console.log(
                    "Error when trying to obtain the routines " + error
                );
            });
    };

    const getExercisesByDay = () => {
        const exercisePerDay: Routine | undefined = routinesData?.routines.find(
            (routine) => routine.fk_day === selectedDay
        );
        exercisePerDay?.RoutineExercises.forEach((exercise) => {
            console.log("----------------Z", exercise);
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

            setExercises((prev) => [...prev, toExercise]);
        });
        setExercises(exercises);
    };

    useEffect(() => {
        if (currentDay) {
            getRoutines(currentDay);
        }
    }, [currentDay]);

    useEffect(() => {
        if (selectedDay) {
            getExercisesByDay();
        }
    }, [selectedDay]);

    console.log("--------------------->", exercises, selectedDay);

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
                {exerciseData.map((exercise) => (
                    <TableHome
                        key={exercise.pk_exercise}
                        exercise={exercise}
                        setShowModal={setShowEnterWeightModal}
                    />
                ))}
            </View>
        );
    };

    return contentIsLoading ? (
        <LoadingScreen />
    ) : (
        <ScrollView>
            {renderDaysOptions()}
            {noRoutines ? (
                <NoContentMessage
                    title={t("HomeScreen:No_Routines")}
                    buttonLabel={t("RoutineScreen:Create_Routine")}
                />
            ) : (
                renderExerciseList()
            )}
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
