import React, { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Subtitle from '../shared/Subtitle'
import { useTranslation } from 'react-i18next'
import Button from '../shared/Button'
import { ThemeContext } from '../../context/themeContext'

const MainHomeScreen = () => {
    const {t} = useTranslation();
    const {theme} = useContext(ThemeContext);

    const styles = StyleSheet.create({
        container: {alignItems: "flex-start", gap: 27},
        buttonsContainer: {width: "100%", flexDirection: "row", justifyContent: "space-between", alignItems: "center"},
        text: {fontFamily: "Inter_400Regular", color: theme.white, fontSize: 17}
    })

  return (
    <View style={styles.container}>
        <Subtitle>{t("HomeScreen:Subtitle")}</Subtitle>
        <View style={styles.buttonsContainer}>
            <Button 
            label={t("HomeScreen:Routines")} 
            onPress={() => {}}
            width={130}
            height={50}
            />
            <Button 
            label={t("HomeScreen:Exercises")} 
            onPress={() => {}}
            width={130}
            height={50}
            />
        </View>
        <Text style={styles.text}>{t("HomeScreen:Take_Control")}</Text>
    </View>
  )
}

export default MainHomeScreen