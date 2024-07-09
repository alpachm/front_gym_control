import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/Home/HomeScreen";
import RoutineScreen from "../screens/Routine/RoutineScreen";
import ExerciseScreen from "../screens/Exercise/ExerciseScreen";

export type RootAppStackParams = {
  Home: undefined;
  Routine: undefined;
  Exercise: undefined;
};

const Stack = createStackNavigator<RootAppStackParams>();

function AppStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Routine" component={RoutineScreen} />
      <Stack.Screen name="Exercise" component={ExerciseScreen} />
    </Stack.Navigator>
  );
}

export default AppStackNavigator;
