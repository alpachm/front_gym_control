import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/Home/HomeScreen';

export type RootAppStackParams= {
    Home: undefined;
}

const Stack = createStackNavigator<RootAppStackParams>();

function AppStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{
        headerShown: false
    }}>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}

export default AppStackNavigator;