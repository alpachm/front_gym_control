import { FieldValues } from "react-hook-form";

export interface LoginUserEntity extends FieldValues {
    email: string;
    password: string;
}