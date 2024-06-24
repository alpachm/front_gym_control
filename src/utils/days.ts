export enum EDays{
    Monday = "Monday",
    Tuesday = "Tuesday",
    Wednesday = "Wednesday",
    Thursday = "Thursday",
    Friday = "Friday",
    Saturday = "Saturday",
    Sunday = "Sunday"
};

export interface IOptionDay {
    label: EDays;
    value: number;
};

const days: IOptionDay[] = [
    {
        label: EDays.Monday,
        value: 1
    },
    {
        label: EDays.Tuesday,
        value: 2
    },
    {
        label: EDays.Wednesday,
        value: 3
    },
    {
        label: EDays.Thursday,
        value: 4
    },
    {
        label: EDays.Friday,
        value: 5
    },
    {
        label: EDays.Saturday,
        value: 6
    },
    {
        label: EDays.Sunday,
        value: 7
    },
];

export default days;