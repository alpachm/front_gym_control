import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import PrincipalLayout from "../../PrincipalLayout";
import Title from "../../components/shared/Title";
import { useTranslation } from "react-i18next";
import PrimaryInput from "../../components/shared/PrimaryInput";
import IconEmail from "../../icons/IconEmail";
import IconKey from "../../icons/IconKey";
import TextCallToAction from "../../components/shared/TextCallToAction";
import EnterFooter from "../../components/shared/EnterFooter";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParams } from "../../navigation/StackNavigator";
import { Controller, useForm } from "react-hook-form";
import { LoginUserEntity } from "../../entities/loginUser.entity";
import InputErrorMessage from "../../components/shared/InputErrorMessage";
import { validateIfValidEmail } from "../../utils/inputsValidations";
import LoginService from "../../services/LoginService";
import {
    EApiMessageResponse,
    EApiStatusResponse,
} from "../../enums/apiResponse.enum";
import EModalTime from "../../enums/modalTime.enum";
import SuccessModal from "../../components/modals/SuccessModal";
import ErrorModal from "../../components/modals/ErrorModal";
import LoadingScreen from "../../components/shared/LoadingScreen";
import { clearAllStorageData, setStorageData } from "../../utils/asyncStorage";

const LoginScreen = () => {
    const { t } = useTranslation();
    const navigation = useNavigation<NavigationProp<RootStackParams>>();
    const {
        control,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<LoginUserEntity>({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const [errorsState, setErrorsState] = useState({
        isInvalidEmail: false,
        isWrongEmailOrPassword: false,
        isUserNotFound: false,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [successLogin, setSuccessLogin] = useState(false);
    const [errorLogin, setErrorLogin] = useState(false);

    useEffect(() => {
        if (successLogin) {
            setTimeout(() => {
                setSuccessLogin(false);
                navigation.navigate("BottomTabsNavigator");
            }, EModalTime.SHORT);
        }

        if (errorLogin) {
            setTimeout(() => {
                setErrorLogin(false);
            }, EModalTime.SHORT);
        }

        if (errorsState.isWrongEmailOrPassword) {
            setTimeout(() => {
                setErrorsState({
                    ...errorsState,
                    isWrongEmailOrPassword: false,
                });
            }, EModalTime.MEDIUM);
        }

        if (errorsState.isUserNotFound) {
            setTimeout(() => {
                setErrorsState({
                    ...errorsState,
                    isUserNotFound: false,
                });
            }, EModalTime.MEDIUM);
        }
    }, [successLogin, errorLogin, errorsState]);

    const onSubmit = async (data: LoginUserEntity) => {
        setIsLoading(true);
        await LoginService(data)
            .then(async (res) => {
                if (
                    res.message === EApiMessageResponse.WRONG_EMAIL_OR_PASSWORD
                ) {
                    setErrorsState({
                        ...errorsState,
                        isWrongEmailOrPassword: true,
                    });
                    return;
                }

                if (res.message === EApiMessageResponse.USER_NOT_FOUND) {
                    setErrorsState({
                        ...errorsState,
                        isUserNotFound: true,
                    });
                    return;
                }

                if (res.status === EApiStatusResponse.SUCCESS) {
                    await clearAllStorageData();
                    await setStorageData("user", JSON.stringify(res.user));
                    await setStorageData("token", res.token);
                    setSuccessLogin(true);
                    reset();
                } else {
                    setErrorLogin(true);
                }
            })
            .catch((error) => {
                setErrorLogin(true);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const renderModals = () => {
        if (successLogin) {
            return <SuccessModal title={t("Modal:Success_Login")} />;
        }

        if (errorLogin) {
            return <ErrorModal title={t("Modal:Error_Login")} />;
        }

        if (errorsState.isWrongEmailOrPassword) {
            return <ErrorModal title={t("Modal:Wrong_Email_Or_Password")} />;
        }

        if (errorsState.isUserNotFound) {
            return <ErrorModal title={t("Modal:User_Not_Found")} />;
        }

        return null;
    };

    const renderInputs = () => {
        return (
            <View style={styles.inputs_view}>
                <Controller
                    control={control}
                    name="email"
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <PrimaryInput
                            placeholder={t("PlaceholderText:Enter_Email")}
                            onChange={onChange}
                            onBlur={() => {
                                if (!!watch("email")) {
                                    setErrorsState({
                                        ...errorsState,
                                        isInvalidEmail: !validateIfValidEmail(
                                            watch("email")
                                        ),
                                    });
                                }
                            }}
                            value={value}
                            icon={IconEmail}
                            inputMode="email"
                            isError={
                                errors.email?.type === "required" ||
                                errorsState.isInvalidEmail
                            }
                        />
                    )}
                />
                {errorsState.isInvalidEmail ? (
                    <InputErrorMessage message={t("Error:Invalid_Email")} />
                ) : null}
                {errors.email?.type === "required" ? (
                    <InputErrorMessage message={t("Error:Required")} />
                ) : null}
                <Controller
                    control={control}
                    name="password"
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <PrimaryInput
                            placeholder={t("PlaceholderText:Enter_Password")}
                            onChange={onChange}
                            onBlur={onBlur}
                            value={value}
                            icon={IconKey}
                            inputMode="text"
                            isError={errors.password?.type === "required"}
                            secureTextEntry
                        />
                    )}
                />
                {errors.password?.type === "required" ? (
                    <InputErrorMessage message={t("Error:Required")} />
                ) : null}
                <TextCallToAction
                    onPress={() => {}}
                    textAlign="right"
                    styles={{ marginBottom: 45 }}
                >
                    {t("LoginScreen:Forgot_Password")}
                </TextCallToAction>
            </View>
        );
    };

    return (
        <>
            <PrincipalLayout status="Login" backButton>
                <View style={styles.constainer}>
                    <Title>{t("LoginScreen:Title")}</Title>
                    <View style={styles.view}>
                        {renderInputs()}
                        <EnterFooter
                            buttonLabel={t("Actions:Enter")}
                            onPress={handleSubmit(onSubmit)}
                        />
                    </View>
                </View>
            </PrincipalLayout>

            {isLoading ? <LoadingScreen /> : null}
            {renderModals()}
        </>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    constainer: {
        flex: 1,
        justifyContent: "space-between",
        paddingTop: 90,
    },
    view: {},
    inputs_view: {
        gap: 12,
    },
});
