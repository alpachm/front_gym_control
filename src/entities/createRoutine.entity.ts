import {FieldValues} from "react-hook-form";

export interface CreateRoutineEntity extends FieldValues {
    fk_user: number;
    fk_day:  number;
    name: string;
}