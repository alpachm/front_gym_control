export default interface ExerciseEntity {
    id: number;
    name: string; 
    reps: number;
    last_weight: number;
    current_weight: number;
    img_url: string;
    completed: boolean;
}