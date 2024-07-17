import React, { useContext } from "react";
import PrincipalLayout from "../../PrincipalLayout";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Title from "../../components/shared/Title";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../../context/themeContext";
import GenericInput from "../../components/shared/GenericInput";
import GenericSelect from "../../components/shared/GenericSelect";
import { toCapitalize } from "../../utils/formatText";
import AddImage from "../../components/CreateExerciseScreen/AddImage";
import GenericButton from "../../components/shared/GenericButton";

const selectData = [
    {
        title: toCapitalize("rutina lunes"),
        value: 1,
    },
    {
        title: toCapitalize("rutina martes"),
        value: 2,
    },
    {
        title: toCapitalize("rutina miercoles"),
        value: 3,
    },
    {
        title: toCapitalize("rutina jueves"),
        value: 4,
    },
];

const CreateExerciseScreen = () => {
    const { t } = useTranslation();
    const { theme } = useContext(ThemeContext);

    const renderOptional = () => {
        return (
            <Text style={{ ...styles.optional, color: theme.red }}>{`(${t(
                "CreateExerciseScreen:Optional"
            )})`}</Text>
        );
    };

    const inputEnterName = () => {
        return (
            <GenericInput
                placeholder={t("CreateExerciseScreen:Enter_Name")}
                onChange={() => {}}
            />
        );
    };

    const inputEnterWeight = () => {
        return (
            <>
                {renderOptional()}
                <GenericInput
                    placeholder={t("CreateExerciseScreen:Enter_Weight")}
                    onChange={() => {}}
                />
            </>
        );
    };

    const inputEnterReps = () => {
        return (
            <>
                {renderOptional()}
                <GenericInput
                    placeholder={t("CreateExerciseScreen:Enter_Reps")}
                    onChange={() => {}}
                />
            </>
        );
    };

    const selectRoutine = () => {
        return (
            <>
                {renderOptional()}
                <GenericSelect
                    placeholder={t("CreateExerciseScreen:Slect_Routine")}
                    data={selectData}
                />
            </>
        );
    };

    return (
        <PrincipalLayout status="Other" backButton>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.title}>
                    <Title color={theme.text_color} maxWidth={0.8}>
                        {t("CreateExerciseScreen:Title")}
                    </Title>
                </View>
                <View style={styles.inputsContainer}>
                    <View style={styles.inputContainer}>
                        {inputEnterName()}
                    </View>
                    <View style={styles.inputContainer}>
                        {inputEnterWeight()}
                    </View>
                    <View style={styles.inputContainer}>
                        {inputEnterReps()}
                    </View>
                    <View style={styles.inputContainer}>{selectRoutine()}</View>
                </View>
                <View style={styles.addImageConatiner}>
                    <View style={styles.addImageHeader}>
                        <Text
                            style={{
                                ...styles.optional,
                                color: theme.text_color,
                            }}
                        >
                            {t("CreateExerciseScreen:Add_Image")}
                        </Text>
                        {renderOptional()}
                    </View>
                    <AddImage />
                </View>
                <GenericButton
                    label={t("CreateExerciseScreen:Create_Exercise")}
                    onPress={() => {}}
                    backgroundColor={theme.green}
                />
            </ScrollView>
        </PrincipalLayout>
    );
};

export default CreateExerciseScreen;

const styles = StyleSheet.create({
    title: {
        marginBottom: 70,
    },
    inputsContainer: {
        gap: 15,
        marginBottom: 30,
    },
    inputContainer: {
        gap: 2,
    },
    optional: {
        fontFamily: "Inter_300Light",
        fontSize: 11,
    },
    addImageConatiner: {
        gap: 3,
        marginBottom: 30,
    },
    addImageHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 2,
    },
});
