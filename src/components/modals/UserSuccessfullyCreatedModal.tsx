import React, { useContext } from "react";
import LayoutModal from "./LayoutModal";
import { StatusBar, Text, View } from "react-native";
import { ThemeContext } from "../../context/themeContext";
import IconCheck from "../../icons/IconCheck";
import useGlobalStyles from "../../styles/useGlobalStyles";
import { useTranslation } from "react-i18next";

interface Props {
    isVisible: boolean;
}

const CreatedUserModal = (props: Props) => {
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
                            backgroundColor: theme.green,
                        }}
                    >
                        <IconCheck width={30} height={30} fill={theme.white} />
                    </View>
                    <Text style={txtConfirmModal}>
                        {t("Modal:Created_User")}
                    </Text>
                </View>
            </LayoutModal>
        </>
    );
};

export default CreatedUserModal;
