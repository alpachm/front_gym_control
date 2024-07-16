import React, { useContext, useState } from "react";
import PrincipalLayout from "../../PrincipalLayout";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Title from "../../components/shared/Title";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../../context/themeContext";
import SelectDropdown from "react-native-select-dropdown";
import IconDownArrow from "../../icons/IconDownArrow";
import { TextInput } from "react-native-gesture-handler";
import ListExerciseModal from "../../components/modals/ListExerciseModal";
import GenericInput from "../../components/shared/GenericInput";
import GenericSelect from "../../components/shared/GenericSelect";

const CreateRoutineScreen = () => {
    const { t } = useTranslation();
    const { theme } = useContext(ThemeContext);
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

    const renderButton = (
        label: string,
        onPress: () => void,
        success?: boolean
    ) => {
        return (
            <Pressable
                onPress={onPress}
                style={({ pressed }) => [
                    {
                        ...styles.button,
                        backgroundColor: success ? theme.green : theme.primary,
                        opacity: pressed ? 0.5 : 1,
                    },
                ]}
            >
                <Text style={{ ...styles.buttonText, color: theme.white }}>
                    {label.toLowerCase()}
                </Text>
            </Pressable>
        );
    };

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
                            {renderButton(
                                t("CreateRoutineScreen:Add_Exercise"),
                                () => {
                                    setShowAddExerciseModal(true);
                                }
                            )}
                            {renderButton(
                                t("CreateRoutineScreen:Create_Exercise"),
                                () => {}
                            )}
                        </View>
                    </View>

                    {renderButton(
                        t("CreateRoutineScreen:Create_Routine"),
                        () => {},
                        true
                    )}
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
    button: {
        padding: 15,
        borderRadius: 6,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        fontFamily: "Inter_700Bold",
        fontSize: 15,
    },
});
