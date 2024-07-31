import React, { useContext, useEffect, useRef, useState } from "react";
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
} from "../../utils/inputsValidations";
import { ThemeContext } from "../../context/themeContext";
import SignupService from "../../services/SignupService";
import LoadingScreen from "../../components/shared/LoadingScreen";
import CreatedUserModal from "../../components/modals/UserSuccessfullyCreatedModal";
import EApiStatusResponse from "../../enums/apiStatusRespponse.enum";
import EModalTime from "../../enums/modalTime.enum";

const RegisterScreen = () => {
    const { t } = useTranslation();
    const { theme } = useContext(ThemeContext);

    const [isInvalidEmail, setIsInvalidEmail] = useState(false);
    const [isDifferentPassword, setIsDifferentPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [createdUserSuccesfully, setCreatedUserSuccesfully] = useState(false);
    const [createdUserError, setCreatedUserError] = useState(false);

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

    const formUserData = useRef<CreateUserDataEntity>({
        name: "",
        last_name: "",
        email: "",
        password: "",
        img_url: "",
    });
    const confirmPassword = useRef<string>("");

    const renderErrorMessage = (message: string) => {
        return (
            <View style={styles.errorTxtContainer}>
                <Text style={{ ...styles.errorTxt, color: theme.red_error }}>
                    {message}
                </Text>
            </View>
        );
    };

    const onSubmit = async () => {
        setIsLoading(true);
        await SignupService(formUserData.current)
            .then((res) => {
                if (res.status === EApiStatusResponse.SUCCESS) {
                    setCreatedUserSuccesfully(true);
                } else {
                    setCreatedUserError(true);
                }
            })
            .catch((error) => {
                console.log("Error: ", error);
            })
            .finally(() => {
                setIsLoading(false);
                formUserData.current = {
                    name: "",
                    last_name: "",
                    email: "",
                    password: "",
                    img_url: "",
                };
            });
    };

    const renderInputs = () => {
        return (
            <View style={styles.inputsView}>
                <PrimaryInput
                    icon={IconUser}
                    placeholder={t("PlaceholderText:Enter_Name")}
                    inputMode="text"
                    onChenge={(e) =>
                        (formUserData.current = {
                            ...formUserData.current,
                            name: e,
                        })
                    }
                />
                <PrimaryInput
                    icon={IconUser}
                    placeholder={t("PlaceholderText:Enter_Last_Name")}
                    inputMode="text"
                    onChenge={(e) =>
                        (formUserData.current = {
                            ...formUserData.current,
                            last_name: e,
                        })
                    }
                />
                <PrimaryInput
                    icon={IconEmail}
                    placeholder={t("PlaceholderText:Enter_Email")}
                    inputMode="email"
                    onChenge={(e) =>
                        (formUserData.current = {
                            ...formUserData.current,
                            email: e,
                        })
                    }
                    onBlur={() => {
                        setIsInvalidEmail(
                            !validateIfValidEmail(formUserData.current.email)
                        );
                    }}
                    isError={isInvalidEmail}
                />
                {isInvalidEmail
                    ? renderErrorMessage(t("Error:Invalid_Email"))
                    : null}
                <PrimaryInput
                    icon={IconKey}
                    placeholder={t("PlaceholderText:Enter_Password")}
                    inputMode="text"
                    secureTextEntry
                    onChenge={(e) =>
                        (formUserData.current = {
                            ...formUserData.current,
                            password: e,
                        })
                    }
                    isError={isDifferentPassword}
                />
                <PrimaryInput
                    icon={IconKey}
                    placeholder={t("PlaceholderText:Confirm_Password")}
                    inputMode="text"
                    secureTextEntry
                    onChenge={(e) => {
                        confirmPassword.current = e;
                    }}
                    onBlur={() => {
                        setIsDifferentPassword(
                            !validateConfirmPassword(
                                formUserData.current.password,
                                confirmPassword.current
                            )
                        );
                    }}
                    isError={isDifferentPassword}
                />
                {isDifferentPassword
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
                            onPress={async () => {
                                await onSubmit();
                                console.log("Data: ", formUserData.current);
                            }}
                        />
                    </View>
                </View>
            </PrincipalLayout>
            <CreatedUserModal isVisible={createdUserSuccesfully} />
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
