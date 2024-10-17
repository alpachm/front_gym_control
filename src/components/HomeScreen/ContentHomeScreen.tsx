import React, {
    Dispatch,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from "react";
import { ScrollView } from "react-native-gesture-handler";
import days from "../../utils/days";
import { Pressable, StyleSheet, View } from "react-native";
import Day from "./Day";
import { ThemeContext } from "../../context/themeContext";
import exerciseData from "../../utils/exercises.data";
import TableHome from "./TableHome";
import EnterWeightModal from "../modals/EnterWeightModal";
import WithoutRoutineModal from "../modals/WithoutRoutineModal";
import { UserContext } from "../../context/userContext";
import LoadingScreen from "../shared/LoadingScreen";

const ContentHomeScreen = () => {
    const { theme } = useContext(ThemeContext);
    const { currentDay } = useContext(UserContext);
    const [selectedDay, setSelectedDay] = useState(0);
    const [showEnterWeightModal, setShowEnterWeightModal] = useState(false);
    const [showWithoutRoutineModal, setShowWithoutRoutineModal] =
        useState(true);
    const [contentIsLoading, setContentIsLoading] = useState(true);

    useEffect(() => {
        if (currentDay) {
            days.forEach((day, index) => {
                const abbreviatedDay = day.label.slice(0, 3);

                if (abbreviatedDay === currentDay) {
                    setSelectedDay(day.value);
                    setContentIsLoading(false);
                }
            });
        }
    }, [currentDay]);

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
                        key={exercise.id}
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
            {renderExerciseList()}
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
