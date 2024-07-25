export interface ISignupResponse {
    status:  string;
    message: string;
    user:    User;
}

export interface User {
    name:      string;
    last_name: string;
    email:     string;
}
