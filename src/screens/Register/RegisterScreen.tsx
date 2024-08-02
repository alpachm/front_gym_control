import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import PrincipalLayout from "../../PrincipalLayout";
import Title from "../../components/shared/Title";
import { useTranslation } from "react-i18next";
import PrimaryInput from "../../components/shared/PrimaryInput";
import IconUser from "../../icons/IconUser";
import IconEmail from "../../icons/IconEmail";
import IconKey from "../../icons/IconKey";
import EnterFooter from "../../components/shared/EnterFooter";
import { CreateUserDataEntity } from "../../entities/createUserData.entity";
import {
    validateConfirmPassword,
    validateIfValidEmail,
    validatePasswordLength,
} from "../../utils/inputsValidations";
import { ThemeContext } from "../../context/themeContext";
import SignupService from "../../services/SignupService";
import LoadingScreen from "../../components/shared/LoadingScreen";
import UserSuccessfullyCreatedModal from "../../components/modals/UserSuccessfullyCreatedModal";
import EApiStatusResponse from "../../enums/apiStatusRespponse.enum";
import EModalTime from "../../enums/modalTime.enum";
import UserErrorCreatedModal from "../../components/modals/UserErrorCreatedModal";
import { Controller, Form, useForm } from "react-hook-form";

const RegisterScreen = () => {
    const { t } = useTranslation();
    const { theme } = useContext(ThemeContext);
    const {
        control,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<CreateUserDataEntity>({
        defaultValues: {
            name: "",
            last_name: "",
            email: "",
            password: "",
            img_url: "",
        },
    });

    const [isLoading, setIsLoading] = useState(false);
    const [createdUserSuccesfully, setCreatedUserSuccesfully] = useState(false);
    const [createdUserError, setCreatedUserError] = useState(false);
    const [errorsState, setErrorsState] = useState({
        isRequired: false,
        isInvalidEmail: false,
        isDifferentPassword: false,
        isShortPassword: false,
    });

    useEffect(() => {
        if (createdUserSuccesfully) {
            setTimeout(() => {
                setCreatedUserSuccesfully(false);
            }, EModalTime.SHORT);
        }

        if (createdUserError) {
            setTimeout(() => {
                setCreatedUserError(false);
            }, EModalTime.SHORT);
        }
    }, [createdUserSuccesfully, createdUserError]);

    const renderErrorMessage = (message: string) => {
        return (
            <View style={styles.errorTxtContainer}>
                <Text style={{ ...styles.errorTxt, color: theme.red_error }}>
                    {message}
                </Text>
            </View>
        );
    };

    // const onSubmit = async () => {
    //     setIsLoading(true);
    //     await SignupService(formUserData.current)
    //         .then((res) => {
    //             console.log(res);
    //             if (res.status === EApiStatusResponse.SUCCESS) {
    //                 setCreatedUserSuccesfully(true);
    //                 formUserData.current = {
    //                     name: "",
    //                     last_name: "",
    //                     email: "",
    //                     password: "",
    //                     img_url: "",
    //                 };
    //             } else {
    //                 setCreatedUserError(true);
    //             }
    //         })
    //         .catch((error) => {
    //             console.log("Error: ", error);
    //         })
    //         .finally(() => {
    //             setIsLoading(false);
    //         });
    // };

    const onSubmit = (data: CreateUserDataEntity) => {
        console.log(data);
        setErrorsState({
            isDifferentPassword: false,
            isInvalidEmail: false,
            isRequired: false,
            isShortPassword: false,
        });
    };

    const cleanFieldError = (
        field: "email" | "password" | "confirm_password"
    ) => {
        switch (field) {
            case "email":
                if (errorsState.isInvalidEmail) {
                    if (!watch("email"))
                        setErrorsState({
                            ...errorsState,
                            isInvalidEmail: false,
                        });
                }
                break;

            case "password":
                if (errorsState.isShortPassword) {
                    if (!watch("password"))
                        setErrorsState({
                            ...errorsState,
                            isShortPassword: false,
                        });
                }
                break;

            case "confirm_password":
                if (errorsState.isDifferentPassword) {
                    if (!watch("confirm_password"))
                        setErrorsState({
                            ...errorsState,
                            isDifferentPassword: false,
                        });
                }
                break;
        }
    };

    const renderInputs = () => {
        return (
            <View style={styles.inputsView}>
                <Controller
                    control={control}
                    name="name"
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <PrimaryInput
                            icon={IconUser}
                            placeholder={t("PlaceholderText:Enter_Name")}
                            inputMode="text"
                            onChange={onChange}
                            onBlur={onBlur}
                            value={value}
                            isError={errors.name?.type === "required"}
                        />
                    )}
                />
                {errors.name?.type === "required"
                    ? renderErrorMessage(t("Error:Required"))
                    : null}
                <Controller
                    control={control}
                    name="last_name"
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <PrimaryInput
                            icon={IconUser}
                            placeholder={t("PlaceholderText:Enter_Last_Name")}
                            inputMode="text"
                            onChange={onChange}
                            onBlur={onBlur}
                            value={value}
                            isError={errors.last_name?.type === "required"}
                        />
                    )}
                />
                {errors.last_name?.type === "required"
                    ? renderErrorMessage(t("Error:Required"))
                    : null}
                <Controller
                    control={control}
                    name="email"
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <PrimaryInput
                            icon={IconEmail}
                            placeholder={t("PlaceholderText:Enter_Email")}
                            inputMode="email"
                            onChange={(e) => {
                                onChange(e);
                                cleanFieldError("email");
                            }}
                            value={value}
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
                            isError={
                                errorsState.isInvalidEmail ||
                                errors.email?.type === "required"
                            }
                        />
                    )}
                />
                {errors.email?.type === "required"
                    ? renderErrorMessage(t("Error:Required"))
                    : null}
                {errorsState.isInvalidEmail
                    ? renderErrorMessage(t("Error:Invalid_Email"))
                    : null}
                <Controller
                    control={control}
                    name="password"
                    rules={{ required: true, minLength: 7 }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <PrimaryInput
                            icon={IconKey}
                            placeholder={t("PlaceholderText:Enter_Password")}
                            inputMode="text"
                            secureTextEntry
                            onChange={(e) => {
                                onChange(e);
                                cleanFieldError("password");
                            }}
                            onBlur={() => {
                                if (!!watch("password")) {
                                    setErrorsState({
                                        ...errorsState,
                                        isShortPassword:
                                            !validatePasswordLength(
                                                watch("password")
                                            ),
                                    });
                                }
                            }}
                            value={value}
                            isError={
                                errorsState.isDifferentPassword ||
                                errorsState.isShortPassword ||
                                errors.password?.type === "required"
                            }
                        />
                    )}
                />
                {errors.password?.type === "required"
                    ? renderErrorMessage(t("Error:Required"))
                    : null}
                {errorsState.isShortPassword
                    ? renderErrorMessage(t("Error:Short_Password"))
                    : null}
                <Controller
                    control={control}
                    name="confirm_password"
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <PrimaryInput
                            icon={IconKey}
                            placeholder={t("PlaceholderText:Confirm_Password")}
                            inputMode="text"
                            secureTextEntry
                            onChange={(e) => {
                                onChange(e);
                                cleanFieldError("confirm_password");
                            }}
                            onBlur={() => {
                                if (!!watch("confirm_password")) {
                                    setErrorsState({
                                        ...errorsState,
                                        isDifferentPassword:
                                            !validateConfirmPassword(
                                                watch("password"),
                                                watch("confirm_password")
                                            ),
                                    });
                                }
                            }}
                            value={value}
                            isError={
                                errorsState.isDifferentPassword ||
                                errors.confirm_password?.type === "required"
                            }
                        />
                    )}
                />
                {errors.confirm_password?.type === "required"
                    ? renderErrorMessage(t("Error:Required"))
                    : null}
                {errorsState.isDifferentPassword
                    ? renderErrorMessage(t("Error:Incorrect_Password"))
                    : null}
            </View>
        );
    };

    if (isLoading) {
        return <LoadingScreen isLoading={isLoading} />;
    }

    return (
        <>
            <PrincipalLayout status="Register" backButton>
                <View style={styles.container}>
                    <Title>{t("RegisterScreen:Title")}</Title>

                    <View>
                        {renderInputs()}
                        <EnterFooter
                            buttonLabel={t("Actions:Register")}
                            // onPress={async () => {
                            //     await onSubmit();
                            //     console.log("Data: ", formUserData.current);
                            // }}
                            onPress={handleSubmit(onSubmit)}
                        />
                    </View>
                </View>
            </PrincipalLayout>
            <UserSuccessfullyCreatedModal isVisible={createdUserSuccesfully} />
            <UserErrorCreatedModal isVisible={createdUserError} />
        </>
    );
};

export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
    },
    inputsView: {
        gap: 12,
        marginBottom: 54,
    },
    errorTxtContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    errorTxt: {
        marginTop: -10,
        fontFamily: "Inter_200ExtraLight",
    },
});
