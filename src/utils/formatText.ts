export const toCapitalize = (text: string) => {
    return text.split(" ").map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(" ")
};