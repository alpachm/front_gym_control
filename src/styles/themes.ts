export interface ITheme {
    primary: string;
    bg_color: string;
    bg_modal: string;
    bg_table: string;
    bg_primary_input: string;
    text_color: string;
    icon_color: string;
    white: string;
    green: string;
    red: string;
    blue: string;
    black: string
}

export const light_theme: ITheme = {
    primary: "#ED7D31",
    bg_color: "#DFDDC7",
    bg_modal: "#FFFAF4",
    bg_table: "#FFFAF4",
    bg_primary_input: "#383838",
    text_color: "#242222",
    icon_color: "#0C0C0C",
    white: "#FFFAF4",
    green: "#80DC4B",
    red: "#C70D3A",
    blue: "#5484FF",
    black: "#0C0C0C"
};

export const dark_theme: ITheme = {
    primary: "#ED7D31",
    bg_color: "#0C0C0C",
    bg_modal: "#333333",
    bg_table: "#333333",
    bg_primary_input: "#383838",
    text_color: "#FFFAF4",
    icon_color: "#FFFAF4",
    white: "#FFFAF4",
    green: "#02383C",
    red: "#C70D3A",
    blue: "#5484FF",
    black: "#0C0C0C"
};