import React, { useContext, useState } from "react";
import PrincipalLayout from "../../PrincipalLayout";
import { StyleSheet, Text, View } from "react-native";
import Title from "../../components/shared/Title";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../../context/themeContext";
import ListExerciseModal from "../../components/modals/ListExerciseModal";
import GenericInput from "../../components/shared/GenericInput";
import GenericSelect from "../../components/shared/GenericSelect";
import GenericButton from "../../components/shared/GenericButton";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootAppStackParams } from "../../navigation/AppStackNavigator";

const CreateRoutineScreen = () => {
    const { t } = useTranslation();
    const { theme } = useContext(ThemeContext);
    const navigation = useNavigation<NavigationProp<RootAppStackParams>>();
    const [showAddExerciseModal, setShowAddExerciseModal] = useState(false);

    const data = [
        {
            title: t("Days:Monday"),
            value: 1,
        },
        {
            title: t("Days:Tuesday"),
            value: 2,
        },
        {
            title: t("Days:Wednesday"),
            value: 3,
        },
        {
            title: t("Days:Thursday"),
            value: 4,
        },
        {
            title: t("Days:Friday"),
            value: 5,
        },
        {
            title: t("Days:Saturday"),
            value: 6,
        },
        {
            title: t("Days:Sunday"),
            value: 7,
        },
    ];

    return (
        <>
            <PrincipalLayout status="Other" backButton>
                <View style={styles.container}>
                    <View style={{ gap: 50 }}>
                        <Title color={theme.text_color}>
                            {t("CreateRoutineScreen:Title")}
                        </Title>
                        <View style={styles.contentContainer}>
                            <View>
                                <GenericSelect
                                    placeholder={t(
                                        "CreateRoutineScreen:Enter_Routine_Day"
                                    )}
                                    data={data}
                                />
                            </View>
                            <View>
                                <GenericInput
                                    placeholder={t(
                                        "CreateRoutineScreen:Enter_Routine_Name"
                                    )}
                                    onChange={() => {}}
                                />
                            </View>
                            <GenericButton
                                label={t("CreateRoutineScreen:Add_Exercise")}
                                backgroundColor={theme.primary}
                                onPress={() => {
                                    setShowAddExerciseModal(true);
                                }}
                            />
                            <GenericButton
                                label={t("CreateRoutineScreen:Create_Exercise")}
                                backgroundColor={theme.primary}
                                onPress={() => {
                                    navigation.navigate("CreateExercise", {});
                                }}
                            />
                        </View>
                    </View>

                    <GenericButton
                        label={t("CreateRoutineScreen:Create_Routine")}
                        backgroundColor={theme.green}
                        onPress={() => {}}
                    />
                </View>
            </PrincipalLayout>
            <ListExerciseModal
                isVisible={showAddExerciseModal}
                setIsVisible={setShowAddExerciseModal}
            />
        </>
    );
};

export default CreateRoutineScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
    },
    contentContainer: {
        gap: 10,
    },
});
