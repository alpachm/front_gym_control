import { Linking } from "react-native"

const openUrl = (url: string) => {
    Linking.openURL(url)
};

export default openUrl