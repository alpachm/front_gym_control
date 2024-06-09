import { createStackNavigator } from '@react-navigation/stack';
import StartScreen from '../screens/Start/StartScreen';
import LoginScreen from '../screens/Login/LoginScreen';
import RegisterScreen from '../screens/Register/RegisterScreen';

export type RootStackParams = {
    Start: undefined;
    Login: undefined;
    Register: undefined;
    Drawer: undefined;
}

const Stack = createStackNavigator<RootStackParams>();

export default function StackNavigator() {
  return (
    <Stack.Navigator 
    screenOptions={{
      headerShown: false
    }}
    >
      <Stack.Screen name="Start" component={StartScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Drawer" component={StartScreen} />
    </Stack.Navigator>
  );
}