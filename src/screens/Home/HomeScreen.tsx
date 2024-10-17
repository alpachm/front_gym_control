import React, { useContext, useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";
import PrincipalLayout from "../../PrincipalLayout";
import MainHomeScreen from "../../components/HomeScreen/MainHomeScreen";
import ContentHomeScreen from "../../components/HomeScreen/ContentHomeScreen";
import { UserContext } from "../../context/userContext";

const HomeScreen = () => {
    const { currentDay, setCurrentDay } = useContext(UserContext);

    useEffect(() => {
        const date = new Date().toString();
        const day = date.split(" ")[0];

        if (currentDay !== day) {
            setCurrentDay(day);
        }
    }, [currentDay]);

    return (
        <PrincipalLayout status="Home">
            <ScrollView style={styles.container}>
                <MainHomeScreen />
                <ContentHomeScreen />
            </ScrollView>
        </PrincipalLayout>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        paddingTop: 100,
        paddingHorizontal: 10,
    },
});
