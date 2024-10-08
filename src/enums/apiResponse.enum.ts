export enum EApiStatusResponse {
    SUCCESS = "success",
    ERROR = "error",
    FAIL = "fail"
}

export enum EApiMessageResponse {
    EMAIL_EXIST = "The email is already registered, enter another email",
    WRONG_EMAIL_OR_PASSWORD = "Email or password incorrect, please try again",
    USER_NOT_FOUND = "User was not found"
}