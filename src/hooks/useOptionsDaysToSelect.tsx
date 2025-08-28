import { useTranslation } from "react-i18next";

const useOptionsDaysToSelect = () => {
    const { t } = useTranslation();

    const optionsDaysToSelect = [
        {
            title: t("Days:Monday"),
            value: 1,
        },
        {
            title: t("Days:Tuesday"),
            value: 2,
        },
        {
            title: t("Days:Wednesday"),
            value: 3,
        },
        {
            title: t("Days:Thursday"),
            value: 4,
        },
        {
            title: t("Days:Friday"),
            value: 5,
        },
        {
            title: t("Days:Saturday"),
            value: 6,
        },
        {
            title: t("Days:Sunday"),
            value: 7,
        },
    ];

    return optionsDaysToSelect;
};

export default useOptionsDaysToSelect;
