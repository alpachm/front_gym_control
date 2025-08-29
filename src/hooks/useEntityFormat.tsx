import ExerciseEntity from "../entities/exercise.entity";
import { RoutineEntity } from "../entities/routine.entity";
import { Exercise } from "../interfaces/GetExercises.interface";
import { IGetRoutinesResponse } from "../interfaces/GetRoutinesResponse.interface";

const useEntityFormat = () => {
    const toRoutinesEntity = (routinesData: IGetRoutinesResponse) => {
        const result: RoutineEntity[] = routinesData?.routines.map(
            (routine) => {
                return {
                    id: routine.pk_routine,
                    name: routine.name,
                    assigned: routine.status,
                };
            }
        );

        return result;
    };

    const toExerciseEntity = (exercise: Exercise[]): ExerciseEntity[] => {
        const result: ExerciseEntity[] = exercise.map((exercise) => {
            return {
                pk_exercise: exercise.pk_exercise,
                name: exercise.name,
                last_weight: 0,
                weight: exercise.weight,
                repetitions: exercise.repetitions,
                img_url: exercise.img_url,
                completed: false,
                status: true,
            };
        });
        return result;
    };

    return { toRoutinesEntity, toExerciseEntity };
};

export default useEntityFormat;
