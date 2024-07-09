import React, { useContext } from "react";
import PrincipalLayout from "../../PrincipalLayout";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Title from "../../components/shared/Title";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../../context/themeContext";
import SelectDropdown from "react-native-select-dropdown";
import IconDownArrow from "../../icons/IconDownArrow";
import { TextInput } from "react-native-gesture-handler";

const CreateRoutineScreen = () => {
    const { t } = useTranslation();
    const { theme } = useContext(ThemeContext);

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

    const renderSelectDropdown = () => {
        return (
            <SelectDropdown
                data={data}
                onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index);
                }}
                renderButton={(selectedItem, isOpened) => {
                    return (
                        <View
                            style={{
                                ...styles.unitsContainer,
                                ...styles.input,
                                borderColor: theme.text_color,
                                backgroundColor: theme.bg_modal,
                            }}
                        >
                            <Text
                                style={{
                                    color: theme.text_color,
                                }}
                            >
                                {(selectedItem && selectedItem.title) ||
                                    t("CreateRoutineScreen:Enter_Routine_Day")}
                            </Text>
                            <IconDownArrow
                                width={11}
                                height={11}
                                fill={theme.text_color}
                            />
                        </View>
                    );
                }}
                renderItem={(item, index, isSelected) => {
                    return (
                        <View
                            style={{
                                ...styles.dropdownItemStyle,
                                ...(isSelected && {
                                    backgroundColor: theme.primary,
                                }),
                                backgroundColor: theme.bg_modal,
                            }}
                        >
                            <Text
                                style={{
                                    ...styles.dropdownItemTxtStyle,
                                    color: theme.text_color,
                                }}
                            >
                                {item.title}
                            </Text>
                        </View>
                    );
                }}
                showsVerticalScrollIndicator={false}
            />
        );
    };

    const renderTextInput = () => {
        return (
            <TextInput
                style={{
                    ...styles.input,
                    backgroundColor: theme.bg_modal,
                    borderColor: theme.text_color,
                    color: theme.text_color,
                }}
                placeholder={t("CreateRoutineScreen:Enter_Routine_Name")}
                placeholderTextColor={theme.text_color}
                cursorColor={theme.primary}
                selectionColor={theme.primary}
            />
        );
    };

    const renderButton = (label: string, success?: boolean) => {
        return (
            <Pressable
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
        <PrincipalLayout status="Other" backButton>
            <View style={styles.container}>
                <View style={{ gap: 50 }}>
                    <Title color={theme.text_color}>
                        {t("CreateRoutineScreen:Title")}
                    </Title>
                    <View style={styles.contentContainer}>
                        <View>{renderSelectDropdown()}</View>
                        <View>{renderTextInput()}</View>
                        {renderButton(t("CreateRoutineScreen:Add_Exercise"))}
                        {renderButton(t("CreateRoutineScreen:Create_Exercise"))}
                    </View>
                </View>

                {renderButton(t("CreateRoutineScreen:Create_Routine"), true)}
            </View>
        </PrincipalLayout>
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
    input: {
        borderWidth: 0.5,
        height: 35,
        paddingHorizontal: 10,
        fontFamily: "Inter_300Light",
    },
    unitsContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    dropdownItemStyle: {
        width: "100%",
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    dropdownItemTxtStyle: {
        fontFamily: "Inter_300Light",
        fontSize: 17,
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
