import React, { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import PrincipalLayout from "../../PrincipalLayout";
import Title from "../../components/shared/Title";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../../context/themeContext";
import Button from "../../components/shared/Button";
import IconPlus from "../../icons/IconPlus";
import ExerciseCard from "../../components/ExerciseScreen/ExerciseCard";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootAppStackParams } from "../../navigation/AppStackNavigator";
import { getStorageData } from "../../utils/asyncStorage";
import GetExercisesService from "../../services/GetExercisesService";
import {
    EApiMessageResponse,
    EApiStatusResponse,
} from "../../enums/apiResponse.enum";
import { Exercise } from "../../interfaces/GetExercises.interface";
import ExerciseEntity from "../../entities/exercise.entity";
import useEntityFormat from "../../hooks/useEntityFormat";
import LoadingScreen from "../../components/shared/LoadingScreen";
import NoContentMessage from "../../components/HomeScreen/NoContentMessage";

const ExerciseScreen = () => {
    const { t } = useTranslation();
    const { theme } = useContext(ThemeContext);
    const navigation = useNavigation<NavigationProp<RootAppStackParams>>();
    const { toExerciseEntity } = useEntityFormat();
    const [isLoading, setIsLoading] = useState(true);
    const [exercises, setExercises] = useState<ExerciseEntity[]>([]);
    const [noExerciseFound, setNoExerciseFound] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);

    useEffect(() => {
        getExercises();
    }, []);

    const getExercises = async () => {
        const user = await getStorageData("user");
        const userData = await JSON.parse(user!);

        await GetExercisesService(userData.id)
            .then((res) => {
                const regex = new RegExp(
                    EApiMessageResponse.NO_EXERCISES_FOUND
                );
                if (regex.test(res.message)) {
                    setNoExerciseFound(true);
                    return;
                }

                if (res.status === EApiStatusResponse.ERROR) {
                    setShowErrorModal(true);
                    return;
                }
                if (res.status === EApiStatusResponse.SUCCESS) {
                    setShowSuccessModal(true);
                    setExercises(toExerciseEntity(res.data));
                }
            })
            .catch((err) => {
                console.error("Error to get exercises: ", err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <PrincipalLayout status="Other" backButton>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Title color={theme.text_color}>
                        {t("ExerciseScreen:Exercises")}
                    </Title>
                    <Button
                        label={t("ExerciseScreen:Create_Exercise")}
                        icon={IconPlus}
                        iconWidth={20}
                        iconHeight={20}
                        width={190}
                        height={50}
                        onPress={() => {
                            navigation.navigate("CreateExercise", {});
                        }}
                    />
                </View>

                {isLoading ? (
                    <LoadingScreen />
                ) : (
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {noExerciseFound ? (
                            <NoContentMessage
                                title={t("ExerciseScreen:No_Exercises")}
                                buttonLabel={t(
                                    "ExerciseScreen:Create_Exercise"
                                )}
                                onPress={() =>
                                    navigation.navigate("CreateExercise", {})
                                }
                            />
                        ) : (
                            <View style={styles.exercisesContainer}>
                                {exercises.map((exercise, index) => (
                                    <ExerciseCard
                                        key={`${exercise.pk_exercise}-${index}`}
                                        data={exercise}
                                    />
                                ))}
                            </View>
                        )}
                    </ScrollView>
                )}
            </View>
        </PrincipalLayout>
    );
};

export default ExerciseScreen;

const styles = StyleSheet.create({
    container: {
        paddingBottom: 160,
    },
    headerContainer: {
        gap: 20,
        marginBottom: 20,
    },
    exercisesContainer: {
        gap: 10,
    },
});
