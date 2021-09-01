import { ThemeState, usePrefsTheme } from "./theme/state";
import { usePrefsVim } from "./vim";

export type PrefsState = ThemeState;

export const usePrefs = (): PrefsState => {
	const theme = usePrefsTheme();
	const vim = usePrefsVim();
	return { ...theme, ...vim };
};
