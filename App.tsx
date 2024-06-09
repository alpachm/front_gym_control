import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';
import './i18n';
import { ThemeContextProvider } from './src/context/themeContext';

export default function App() {
  return (
    <ThemeContextProvider>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </ThemeContextProvider>
  );
}
