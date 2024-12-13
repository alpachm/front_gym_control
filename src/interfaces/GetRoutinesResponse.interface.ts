export interface IGetRoutinesResponse {
    status:   string;
    message:  string;
    routines: Routine[];
}

export interface Routine {
    pk_routine:       number;
    name:             string;
    fk_user:          number;
    fk_day:           number;
    status:           boolean;
    RoutineExercises: RoutineExercise[];
}

export interface RoutineExercise {
    pk_routine_exercise: number;
    Exercise:            Exercise;
}

export interface Exercise {
    pk_exercise: number;
    name:        string;
    weight:      null;
    repetitions: null;
    img_url:     string;
    fk_user:     number;
    status:      boolean;
}
