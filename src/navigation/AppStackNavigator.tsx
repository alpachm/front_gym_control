import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/Home/HomeScreen";
import RoutineScreen from "../screens/Routine/RoutineScreen";
import ExerciseScreen from "../screens/Exercise/ExerciseScreen";
import CreateRoutineScreen from "../screens/Routine/CreateRoutineScreen";
import CreateExerciseScreen from "../screens/Exercise/CreateExerciseScreen";

export type RootAppStackParams = {
    Home: undefined;
    Routine: undefined;
    Exercise: undefined;
    CreateRoutine: { routineId?: number };
    CreateExercise: { exerciseId?: number };
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
            <Stack.Screen
                name="CreateRoutine"
                component={CreateRoutineScreen}
            />
            <Stack.Screen name="Exercise" component={ExerciseScreen} />
            <Stack.Screen
                name="CreateExercise"
                component={CreateExerciseScreen}
            />
        </Stack.Navigator>
    );
}

export default AppStackNavigator;
