import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';
import './i18n';
import { ThemeContextProvider } from './src/context/themeContext';
import {
  Inter_100Thin,
  Inter_400Regular,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { StatusBar } from 'react-native';

export default function App() {
  const [loadedFonts] = useFonts({
    Inter_100Thin,
    Inter_400Regular,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });

  React.useEffect(() => {
    const prepare = async () => {
      if (!loadedFonts) {
        SplashScreen.preventAutoHideAsync();
      } else {
        await SplashScreen.hideAsync();
      }
    };
    prepare();
  }, [loadedFonts]);

  if (!loadedFonts) return null;

  return (
    <>
      <StatusBar translucent backgroundColor={"transparent"} barStyle={'default'} />
      <ThemeContextProvider>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </ThemeContextProvider>
    </>
  );
}
