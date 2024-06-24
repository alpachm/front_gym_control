import React, { useContext } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import PrincipalLayout from '../../PrincipalLayout';
import { ThemeContext } from '../../context/themeContext';
import MainHomeScreen from '../../components/HomeScreen/MainHomeScreen';
import ContentHomeScreen from '../../components/HomeScreen/ContentHomeScreen';

const HomeScreen = () => {
  const { theme } = useContext(ThemeContext);

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
