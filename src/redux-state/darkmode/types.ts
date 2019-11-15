export const TOGGLE_MODE = "TOGGLE_MODE";

export type DarkMode = boolean;

interface ToggleModeReturn {
    type: typeof TOGGLE_MODE;
}

export type ToggleModeAction = () => ToggleModeReturn;


export type DarkModeActionTypes = ToggleModeReturn;
