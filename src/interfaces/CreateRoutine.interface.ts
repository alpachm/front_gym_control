export interface ICreateRoutineResponse {
    status:  string;
    message: string;
    routine: Routine;
}

export interface Routine {
    id:   number;
    name: string;
}
