import { ThemeState, usePrefsTheme } from "./theme/state";
import { usePrefsVim, VimState } from "./vim";

export interface PrefsState extends ThemeState, VimState {}

export const usePrefs = (): PrefsState => {
	const theme = usePrefsTheme();
	const vim = usePrefsVim();
	return { ...theme, ...vim };
};
