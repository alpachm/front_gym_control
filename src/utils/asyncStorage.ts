import AsyncStorage from "@react-native-async-storage/async-storage"

export const setStorageData = async (key: string, value: string) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (e) {
        console.error(e);
    }
}

export const getStorageData = async (key: string) => {
    try {
        const value = await AsyncStorage.getItem(key)

        if(value !== null){
            return value;
        }else {
            return null;
        }
    } catch (e) {
        console.error(e)
    }
}

export const removeStorageData = async (key: string) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (e) {
        console.error(e);
    }
};

export const clearAllStorageData = async () => {
    try {
        await AsyncStorage.clear();
    } catch (e) {
        console.error(e);
    }
};