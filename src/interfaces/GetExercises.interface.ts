export interface IGetExercisesResponse {
    status:  string;
    message: string;
    data:    Exercise[];
}

export interface Exercise {
    pk_exercise: number;
    name:        string;
    weight:      number | null;
    repetitions: number | null;
    img_url:     string;
    fk_user:     number;
}
