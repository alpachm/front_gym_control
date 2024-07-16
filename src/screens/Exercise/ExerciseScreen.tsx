import React, { useContext } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import PrincipalLayout from "../../PrincipalLayout";
import Title from "../../components/shared/Title";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../../context/themeContext";
import Button from "../../components/shared/Button";
import IconPlus from "../../icons/IconPlus";
import exerciseData from "../../utils/exercises.data";
import ExerciseCard from "../../components/ExerciseScreen/ExerciseCard";

const ExerciseScreen = () => {
    const { t } = useTranslation();
    const { theme } = useContext(ThemeContext);

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
                        onPress={() => {}}
                    />
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.exercisesContainer}>
                        {exerciseData.map((exercise, index) => (
                            <ExerciseCard
                                key={`${exercise.id}-${index}`}
                                data={exercise}
                            />
                        ))}
                    </View>
                </ScrollView>
            </View>
        </PrincipalLayout>
    );
};

export default ExerciseScreen;

const styles = StyleSheet.create({
    container: {
        paddingBottom: 155,
    },
    headerContainer: {
        gap: 20,
        marginBottom: 20,
    },
    exercisesContainer: {
        gap: 10,
    },
});
