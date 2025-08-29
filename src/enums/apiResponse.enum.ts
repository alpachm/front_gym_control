export enum EApiStatusResponse {
    SUCCESS = "success",
    ERROR = "error",
    FAIL = "fail"
}

export enum EApiMessageResponse {
    EMAIL_EXIST = "The email is already registered, enter another email",
    WRONG_EMAIL_OR_PASSWORD = "Email or password incorrect, please try again",
    USER_NOT_FOUND = "User was not found",
    ALREADY_ROUTINE_ASSIGNED_DAY = "There is already a routine assigned to the day",
    NO_EXERCISES_FOUND = "^The user with id \\d+ does not yet have exercises register$",
}