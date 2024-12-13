import { IGetRoutinesResponse } from "../interfaces/GetRoutinesResponse.interface";
import { getStorageData } from "../utils/asyncStorage";

const GetRoutinesService = async (userId: number): Promise<IGetRoutinesResponse>  => {
    const token = await getStorageData("token");

    try {
        const result = await fetch(process.env.EXPO_PUBLIC_API_URL + "/routine/" + userId, {
            method: "GET",
            headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
            },
        })
        const response = await result.json();
        return response;
    } catch (error) {
        throw new Error("Error to try get routines " + error)
    }
}

export default GetRoutinesService;