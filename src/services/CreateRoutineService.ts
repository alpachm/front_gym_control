import { CreateRoutineEntity } from "../entities/createRoutine.entity";
import { ICreateRoutineResponse } from "../interfaces/CreateRoutine.interface";
import { getStorageData } from "../utils/asyncStorage";

const CreateRoutineService = async (data: CreateRoutineEntity): Promise<ICreateRoutineResponse> => {
    const token = await getStorageData("token");

    try {
        const result = await fetch(process.env.EXPO_PUBLIC_API_URL + "/routine", {
            method: "POST",
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
            body: JSON.stringify(data)
        })
        const response = await result.json()
        return response;
    } catch (error) {
         throw new Error("Error to try login user: " + error)
    }
}

export default CreateRoutineService;