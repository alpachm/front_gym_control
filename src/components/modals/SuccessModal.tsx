import React, { useContext } from "react";
import LayoutModal from "./LayoutModal";
import { StatusBar, Text, View } from "react-native";
import { ThemeContext } from "../../context/themeContext";
import IconCheck from "../../icons/IconCheck";
import useGlobalStyles from "../../styles/useGlobalStyles";
import { useTranslation } from "react-i18next";

interface Props {
    title: string;
}

const SuccessModal = (props: Props) => {
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
                            backgroundColor: theme.green,
                        }}
                    >
                        <IconCheck width={30} height={30} fill={theme.white} />
                    </View>
                    <Text style={txtConfirmModal}>{props.title}</Text>
                </View>
            </LayoutModal>
        </>
    );
};

export default SuccessModal;
