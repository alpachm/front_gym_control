import { RoutineEntity } from "../entities/routine.entity";
import { IGetRoutinesResponse } from "../interfaces/GetRoutinesResponse.interface";

const useEntityFormat = () => {

    const toRoutinesEntity = (routinesData: IGetRoutinesResponse) => {
        const result: RoutineEntity[] = routinesData?.routines.map((routine) => {
            return {
                id: routine.pk_routine,
                name: routine.name,
                assigned: routine.status
            }
        })

        return result;
    }

    return {toRoutinesEntity}

}

export default useEntityFormat;