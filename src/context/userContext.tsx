import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';

interface IUserContext {
  selectedExerciseId: number;
  setSelectedExerciseId: Dispatch<SetStateAction<number>>;
}

interface UserProviderProps {
  children: ReactNode;
}

export const UserContext = createContext({} as IUserContext);

export const UserContextProvider = (props: UserProviderProps) => {
  const [selectedExerciseId, setSelectedExerciseId] = useState(0);

  const value = {
    selectedExerciseId,
    setSelectedExerciseId,
  };

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};
