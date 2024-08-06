import React, { useContext } from "react";
import LayoutModal from "./LayoutModal";
import { StatusBar, Text, View } from "react-native";
import { ThemeContext } from "../../context/themeContext";
import useGlobalStyles from "../../styles/useGlobalStyles";
import { useTranslation } from "react-i18next";
import IconError from "../../icons/IconError";

interface Props {
    isVisible: boolean;
    title?: string;
}

const UserErrorCreatedModal = (props: Props) => {
    const { theme } = useContext(ThemeContext);
    const { t } = useTranslation();
    const { confirmModal, iconConfirmModal, txtConfirmModal } =
        useGlobalStyles();

    return (
        <>
            <StatusBar
                backgroundColor={
                    props.isVisible ? theme.backdrop_color : "transparent"
                }
            />
            <LayoutModal isVisible={props.isVisible}>
                <View style={confirmModal}>
                    <View
                        style={{
                            ...iconConfirmModal,
                            backgroundColor: theme.red,
                        }}
                    >
                        <IconError width={30} height={30} fill={theme.white} />
                    </View>
                    <Text style={txtConfirmModal}>
                        {props.title
                            ? props.title
                            : t("Modal:Error_Create_User")}
                    </Text>
                </View>
            </LayoutModal>
        </>
    );
};

export default UserErrorCreatedModal;
