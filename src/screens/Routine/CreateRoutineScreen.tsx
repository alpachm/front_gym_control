import React, { useContext, useEffect, useState } from "react";
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
import { Controller, set, useForm } from "react-hook-form";
import { CreateRoutineEntity } from "../../entities/createRoutine.entity";
import useOptionsDaysToSelect from "../../hooks/useOptionsDaysToSelect";
import { getStorageData } from "../../utils/asyncStorage";
import CreateRoutineService from "../../services/CreateRoutineService";
import {
    EApiMessageResponse,
    EApiStatusResponse,
} from "../../enums/apiResponse.enum";
import ErrorModal from "../../components/modals/ErrorModal";
import SuccessModal from "../../components/modals/SuccessModal";
import LoadingScreen from "../../components/shared/LoadingScreen";
import EModalTime from "../../enums/modalTime.enum";
import AlertModal from "../../components/modals/AlertModal";

const CreateRoutineScreen = () => {
    const { t } = useTranslation();
    const { theme } = useContext(ThemeContext);
    const optionsDaysToSelect = useOptionsDaysToSelect();
    const navigation = useNavigation<NavigationProp<RootAppStackParams>>();
    const { handleSubmit, control, reset } = useForm<CreateRoutineEntity>({
        defaultValues: {
            fk_user: 0,
            fk_day: 0,
            name: "",
        },
    });
    const [showAddExerciseModal, setShowAddExerciseModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [sucessCreateRoutine, setSucessCreateRoutine] = useState(false);
    const [errorCreateRoutine, setErrorCreateRoutine] = useState(false);
    const [alreadyRoutineAssined, setAlreadyRoutineAssined] = useState(false);

    useEffect(() => {
        const getUserInfo = async () => {
            const user = await getStorageData("user");
            const userData = await JSON.parse(user!);
            reset({
                fk_user: userData.id,
                fk_day: 0,
                name: "",
            });
        };

        getUserInfo();
    }, []);

    useEffect(() => {
        if (sucessCreateRoutine) {
            setTimeout(() => {
                setSucessCreateRoutine(false);
            }, EModalTime.SHORT);
        }

        if (errorCreateRoutine) {
            setTimeout(() => {
                setErrorCreateRoutine(false);
            }, EModalTime.SHORT);
        }

        if (alreadyRoutineAssined) {
            setTimeout(() => {
                setAlreadyRoutineAssined(false);
            }, EModalTime.SHORT);
        }
    }, [sucessCreateRoutine, errorCreateRoutine, alreadyRoutineAssined]);

    const onSubmit = async (data: CreateRoutineEntity) => {
        setIsLoading(true);
        await CreateRoutineService(data)
            .then(async (res) => {
                if (
                    res.message.includes(
                        EApiMessageResponse.ALREADY_ROUTINE_ASSIGNED_DAY
                    )
                ) {
                    setAlreadyRoutineAssined(true);
                    return;
                }
                if (res.status === EApiStatusResponse.ERROR) {
                    setErrorCreateRoutine(true);
                    console.error("Error", res);
                    return;
                }

                if (res.status === EApiStatusResponse.SUCCESS) {
                    setSucessCreateRoutine(true);
                    reset({
                        fk_user: data.fk_user,
                        fk_day: 0,
                        name: "",
                    });
                    return;
                }
            })
            .catch(async (err) => {
                console.error("Error", err);
                setErrorCreateRoutine(true);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const renderModals = () => {
        if (errorCreateRoutine) {
            return <ErrorModal title={t("Modal:Error_Create_Routine")} />;
        }
        if (sucessCreateRoutine) {
            return <SuccessModal title={t("Modal:Created_Routine")} />;
        }
        if (alreadyRoutineAssined) {
            return (
                <AlertModal title={t("Modal:Already_Routine_Assigned_Day")} />
            );
        }
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
                                <Controller
                                    control={control}
                                    name="fk_day"
                                    rules={{ required: true }}
                                    render={({
                                        field: { value, onChange },
                                    }) => (
                                        <GenericSelect
                                            placeholder={t(
                                                "CreateRoutineScreen:Enter_Routine_Day"
                                            )}
                                            data={optionsDaysToSelect}
                                            onChange={onChange}
                                            value={value}
                                        />
                                    )}
                                />
                            </View>
                            <View>
                                <Controller
                                    control={control}
                                    name="name"
                                    rules={{ required: true }}
                                    render={({
                                        field: { value, onChange },
                                    }) => (
                                        <GenericInput
                                            placeholder={t(
                                                "CreateRoutineScreen:Enter_Routine_Name"
                                            )}
                                            onChange={onChange}
                                            value={value}
                                        />
                                    )}
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
                        onPress={handleSubmit(onSubmit)}
                    />
                </View>
            </PrincipalLayout>
            <ListExerciseModal
                isVisible={showAddExerciseModal}
                setIsVisible={setShowAddExerciseModal}
            />
            {isLoading ? <LoadingScreen /> : null}
            {renderModals()}
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
