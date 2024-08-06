import React, { useContext } from "react";
import LayoutModal from "./LayoutModal";
import { StatusBar, Text, View } from "react-native";
import { ThemeContext } from "../../context/themeContext";
import useGlobalStyles from "../../styles/useGlobalStyles";
import { useTranslation } from "react-i18next";
import IconError from "../../icons/IconError";

interface Props {
    title: string;
}

const ErrorModal = (props: Props) => {
    const { theme } = useContext(ThemeContext);
    const { t } = useTranslation();
    const { confirmModal, iconConfirmModal, txtConfirmModal } =
        useGlobalStyles();

    return (
        <>
            <StatusBar backgroundColor={theme.backdrop_color} />
            <LayoutModal isVisible>
                <View style={confirmModal}>
                    <View
                        style={{
                            ...iconConfirmModal,
                            backgroundColor: theme.red,
                        }}
                    >
                        <IconError width={30} height={30} fill={theme.white} />
                    </View>
                    <Text style={txtConfirmModal}>{props.title}</Text>
                </View>
            </LayoutModal>
        </>
    );
};

export default ErrorModal;
