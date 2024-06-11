import { createStackNavigator } from '@react-navigation/stack';
import StartScreen from '../screens/Start/StartScreen';
import LoginScreen from '../screens/Login/LoginScreen';
import RegisterScreen from '../screens/Register/RegisterScreen';
import HomeScreen from '../screens/Home/HomeScreen';
import { TransitionSpec } from '@react-navigation/stack/lib/typescript/src/types';

export type RootStackParams = {
    Start: undefined;
    Login: undefined;
    Register: undefined;
    Home: undefined;
}

const Stack = createStackNavigator<RootStackParams>();

export default function StackNavigator() {
  const config: TransitionSpec = {
    animation: 'spring',
    config: {
      stiffness: 2000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };

  return (
    <Stack.Navigator 
    screenOptions={{
      headerShown: false,
      transitionSpec: {
        open: config,
        close: config
      },
    }}
    >
      <Stack.Screen name="Start" component={StartScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}