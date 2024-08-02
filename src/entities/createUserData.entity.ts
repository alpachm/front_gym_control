import { FieldValues } from "react-hook-form";

export interface CreateUserDataEntity extends FieldValues {
    name: string;
    last_name: string;
    email: string;
    password: string;
    img_url: string;
}