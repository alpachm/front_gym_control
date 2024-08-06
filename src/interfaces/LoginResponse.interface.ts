export interface ILoginResponse {
    status:  string;
    message: string;
    user:    User;
    token:   string;
}

export interface User {
    full_name: string;
    email:     string;
    img_url:   string;
}
