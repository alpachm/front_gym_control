export default interface ExerciseEntity {
    pk_exercise: number;
    name: string; 
    last_weight: number;
    weight: number;
    repetitions: number;
    img_url: string;
    completed: boolean;
    status: boolean;
}