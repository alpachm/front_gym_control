import SelectEntity from "../entities/select.entity";
import i18next from "i18next";
import ELanguage from "../enums/language.enum";
import EMeasurementSystem from "../enums/measurementSystem.enum";
import EThemeOptions from "../enums/themeOptions.enum";

export const languageOptions: SelectEntity[] = [
    {
        value: ELanguage.ENGLISH,
        title: "Languages:English",
        icon: "https://www.countryflags.com/wp-content/uploads/united-states-of-america-flag-png-xl.png"
    },
    {
        value: ELanguage.SPANISH,
        title: "Languages:Spanish",
        icon: "https://www.countryflags.com/wp-content/uploads/spain-flag-png-xl.png"
    }
]

export const measurementSystemOptions: SelectEntity[] = [
    {
        value: EMeasurementSystem.KILOGRAMS,
        title: "MeasurementSystem:Kilograms",
        icon: "https://cdn-icons-png.flaticon.com/512/5009/5009461.png"
    },
    {
        value: EMeasurementSystem.LIBRAS,
        title: "MeasurementSystem:Libras",
        icon: "https://cdn-icons-png.freepik.com/512/9346/9346284.png"
    }
]

export const themeOptions: SelectEntity[] = [
    {
        value: EThemeOptions.ACTIVATED,
        title: "Actions:Activated",
        icon: "https://cdn.pixabay.com/photo/2014/04/02/17/07/full-moon-308007_1280.png"
    },
    {
        value: EThemeOptions.DESACTIVATED,
        title: "Actions:Desactivated",
        icon: "https://cdn-icons-png.freepik.com/512/9689/9689800.png"
    }
]