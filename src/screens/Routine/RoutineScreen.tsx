import React, { useContext } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import PrincipalLayout from "../../PrincipalLayout";
import Title from "../../components/shared/Title";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../../context/themeContext";
import Button from "../../components/shared/Button";
import IconPlus from "../../icons/IconPlus";
import routineData from "../../utils/routines.data";
import IconEdit from "../../icons/IconEdit";
import IconDelete from "../../icons/IconDelete";
import { toCapitalize } from "../../utils/formatText";

const RoutineScreen = () => {
    const { t } = useTranslation();
    const { theme } = useContext(ThemeContext);

    const renderRoutines = () => {
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                {routineData.map((routine, index) => (
                    <View
                        style={{
                            ...styles.table,
                            backgroundColor: routine.assigned
                                ? theme.green
                                : theme.bg_modal,
                            marginVertical:
                                index !== 0 && index !== routineData.length - 1
                                    ? 10
                                    : 0,
                        }}
                        key={`${routine.id}-${index}`}
                    >
                        <Text
                            style={{ ...styles.text, color: theme.text_color }}
                        >
                            {toCapitalize(routine.name)}
                        </Text>
                        <View style={styles.iconsContainer}>
                            <Pressable
                                style={({ pressed }) => [
                                    {
                                        ...styles.button,
                                        backgroundColor: theme.primary,
                                        opacity: pressed ? 0.5 : 1,
                                    },
                                ]}
                            >
                                <IconEdit
                                    fill={theme.white}
                                    width={15}
                                    height={15}
                                />
                            </Pressable>
                            <Pressable
                                style={({ pressed }) => [
                                    {
                                        ...styles.button,
                                        backgroundColor: theme.red,
                                        opacity: pressed ? 0.5 : 1,
                                    },
                                ]}
                            >
                                <IconDelete
                                    fill={theme.white}
                                    width={15}
                                    height={15}
                                />
                            </Pressable>
                        </View>
                    </View>
                ))}
            </ScrollView>
        );
    };

    return (
        <PrincipalLayout status="Other" backButton>
            <View style={styles.container}>
                <Title color={theme.text_color}>
                    {t("RoutineScreen:Title")}
                </Title>
                <Button
                    label={t("RoutineScreen:Create_Routine")}
                    icon={IconPlus}
                    iconWidth={20}
                    iconHeight={20}
                    width={170}
                    height={50}
                    onPress={() => {}}
                />
                {renderRoutines()}
            </View>
        </PrincipalLayout>
    );
};

export default RoutineScreen;

const styles = StyleSheet.create({
    container: {
        gap: 20,
    },
    table: {
        borderRadius: 7,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20,
    },
    text: {
        fontFamily: "Inter_400Regular",
        fontSize: 22,
    },
    iconsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
    },
    button: {
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
    },
});
