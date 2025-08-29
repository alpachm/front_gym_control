import { IGetExercisesResponse } from '../interfaces/GetExercises.interface';
import { getStorageData } from '../utils/asyncStorage';

const GetExercisesService = async (userId: number): Promise<IGetExercisesResponse> => {
    const token = await getStorageData("token");

    try {
        const result = await fetch(process.env.EXPO_PUBLIC_API_URL + "/exercise/getAllExercise/" + userId, {
            method: "GET",
            headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
            }
        })
        const response = await result.json();
        return response;
    } catch (error) {
        throw new Error("Error to try get exercises " + error)
    }
    
}

export default GetExercisesService;