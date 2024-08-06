import { MutableRefObject } from "react";
import { CreateUserDataEntity } from "../entities/createUserData.entity";
import { ISignupResponse } from "../interfaces/SignupResponse.interface";

const SignupService = async (data: CreateUserDataEntity): Promise<ISignupResponse> => {
    try {
        const result = await fetch(process.env.EXPO_PUBLIC_API_URL + "/auth/signup", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        } );
        const response = await result.json()
        return response;
    } catch (error) {
        throw new Error("Error to try create user: " + error)
    }
}

export default SignupService;