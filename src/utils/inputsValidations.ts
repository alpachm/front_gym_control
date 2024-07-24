export const validateIfValidEmail = (email: string) => {
    if (
        !email.includes("@") ||
        !email.includes(".")
    )
        return false;

    return true;
};

export const validateConfirmPassword = (password: string, confirmPassword: string) => {
    if(confirmPassword !== password) return false;

    return true;
}