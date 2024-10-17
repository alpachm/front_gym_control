import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useState,
} from "react";

interface IUserContext {
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

    const value = {
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
