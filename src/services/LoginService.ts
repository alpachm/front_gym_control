import { LoginUserEntity } from "../entities/loginUser.entity";
import { ILoginResponse } from "../interfaces/LoginResponse.interface";

const LoginService = async (data: LoginUserEntity): Promise<ILoginResponse> => {
    try {
        const result = await fetch(process.env.EXPO_PUBLIC_API_URL + "/auth/signin", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
        const response = await result.json()
        return response;
    } catch (error) {
        throw new Error("Error to try login user: " + error)
    }
}

export default LoginService;