import { useContext } from "react";
import { ThemeContext } from "../../context/themeContext";
import { StatusBar } from "expo-status-bar";
import LayoutModal from "./LayoutModal";
import { Text, View } from "react-native";
import useGlobalStyles from "../../styles/useGlobalStyles";
import IconkAlert from "../../icons/IconAlert";

interface Props {
    title: string;
}

const AlertModal = (props: Props) => {
    const { theme } = useContext(ThemeContext);
    const { confirmModal, iconConfirmModal, txtConfirmModal } =
        useGlobalStyles();

    return (
        <>
            <StatusBar backgroundColor={theme.backdrop_color} />
            <LayoutModal isVisible>
                <View style={{ ...confirmModal }}>
                    <View
                        style={{
                            ...iconConfirmModal,
                            backgroundColor: theme.yellow,
                            borderRadius: 100,
                        }}
                    >
                        <IconkAlert width={30} height={30} fill={theme.white} />
                    </View>
                    <Text style={txtConfirmModal}>{props.title}</Text>
                </View>
            </LayoutModal>
        </>
    );
};

export default AlertModal;
