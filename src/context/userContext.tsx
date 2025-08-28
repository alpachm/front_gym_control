import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useState,
} from "react";
import { IGetRoutinesResponse } from "../interfaces/GetRoutinesResponse.interface";

interface IUserContext {
    routinesData: IGetRoutinesResponse;
    setRoutinesData: Dispatch<SetStateAction<IGetRoutinesResponse>>;
    selectedExerciseId: number;
    setSelectedExerciseId: Dispatch<SetStateAction<number>>;
    currentDay: string;
    setCurrentDay: Dispatch<SetStateAction<string>>;
}

interface UserProviderProps {
    children: ReactNode;
}

export const UserContext = createContext({} as IUserContext);

export const UserContextProvider = (props: UserProviderProps) => {
    const [selectedExerciseId, setSelectedExerciseId] = useState(0);
    const [currentDay, setCurrentDay] = useState("");
    const [routinesData, setRoutinesData] = useState(
        {} as IGetRoutinesResponse
    );

    const value = {
        routinesData,
        setRoutinesData,
        selectedExerciseId,
        setSelectedExerciseId,
        currentDay,
        setCurrentDay,
    };

    return (
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    );
};
