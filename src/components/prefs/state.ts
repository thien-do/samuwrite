import { LayoutState, usePrefsLayout } from "./layout";
import { SizeState, usePrefsSize } from "./size/state";
import { ThemeState, useThemeState } from "../theme/state";
import { VimState, usePrefsVim } from "./vim";
import { PrefsVisibleState, usePrefsVisibleState } from "./prefs-visible";

export interface PrefsState
	extends ThemeState,
		VimState,
		LayoutState,
		PrefsVisibleState,
		SizeState {}

export const usePrefs = (): PrefsState => {
	const theme = useThemeState();
	const vim = usePrefsVim();
	const layout = usePrefsLayout();
	const size = usePrefsSize();
	const prefsVisible = usePrefsVisibleState();
	return { ...theme, ...vim, ...layout, ...prefsVisible, ...size };
};
