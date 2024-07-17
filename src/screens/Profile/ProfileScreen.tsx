import React, { useContext } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import PrincipalLayout from "../../PrincipalLayout";
import { useTranslation } from "react-i18next";
import ProfileSelect from "../../components/ProfileScreen/ProfileSelect";
import { ThemeContext } from "../../context/themeContext";
import { toCapitalize } from "../../utils/formatText";

const ProfileScreen = () => {
    const { t } = useTranslation();
    const { theme } = useContext(ThemeContext);

    const renderLabel = (label: string) => {
        return (
            <Text style={{ ...styles.label, color: theme.text_color }}>
                {label}
            </Text>
        );
    };

    const renderLanguageOptions = () => {
        return (
            <View>
                {renderLabel(t("Actions:Select_Language"))}
                <ProfileSelect />
            </View>
        );
    };

    const renderMeasuringSystemOptions = () => {
        return (
            <View>
                {renderLabel(t("Actions:Select_Measurement_System"))}
                <ProfileSelect />
            </View>
        );
    };

    const renderThemeOptions = () => {
        return (
            <View>
                {renderLabel(t("Actions:Select_Theme"))}
                <ProfileSelect />
            </View>
        );
    };

    return (
        <PrincipalLayout status="Other" backButton>
            <View style={styles.container}>
                <View style={styles.mainContentContainer}>
                    <View
                        style={{
                            ...styles.box,
                            backgroundColor: theme.bg_modal,
                        }}
                    >
                        <Image
                            style={styles.image}
                            source={{
                                uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Foto_Perfil_.jpg/720px-Foto_Perfil_.jpg",
                            }}
                        />
                        <Text
                            style={{ ...styles.name, color: theme.text_color }}
                        >
                            {toCapitalize("andrew forest")}
                        </Text>
                        <Text
                            style={{ ...styles.email, color: theme.text_color }}
                        >
                            andrefrest@gmail.com
                        </Text>
                    </View>

                    <View>
                        <View>{renderLanguageOptions()}</View>
                        <View>{renderMeasuringSystemOptions()}</View>
                        <View>{renderThemeOptions()}</View>
                    </View>
                </View>
                <Pressable style={({ pressed }) => [{}]}>
                    <Text>{t("Actions:Logout")}</Text>
                </Pressable>
            </View>
        </PrincipalLayout>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
    },
    mainContentContainer: {
        gap: 50,
    },
    box: {
        width: 300,
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
        paddingVertical: 15,
        borderRadius: 10,
    },
    image: {
        borderRadius: 60,
        width: 120,
        height: 120,
    },
    name: {
        fontFamily: "Inter_700Bold",
        fontSize: 20,
    },
    email: {
        fontFamily: "Inter_200ExtraLight",
        fontSize: 14,
    },
    label: {
        fontFamily: "Inter_200ExtraLight",
        fontSize: 13,
    },
});
