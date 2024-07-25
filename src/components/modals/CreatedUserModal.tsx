import React from "react";
import LayoutModal from "./LayoutModal";
import { StyleSheet, Text, View } from "react-native";

const CreatedUserModal = () => {
    return (
        <LayoutModal isVisible>
            <View style={{ ...styles.container }}>
                <Text>Hola mundo</Text>
            </View>
        </LayoutModal>
    );
};

export default CreatedUserModal;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
    },
});
