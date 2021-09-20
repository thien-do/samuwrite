import { PreviewState, usePrefsPreview } from "./preview";
import { SizeState, usePrefsSize } from "./size/state";
import { ThemeState, usePrefsTheme } from "../theme/state";
import { VimState, usePrefsVim } from "./vim";
import { PrefsVisibleState, usePrefsVisibleState } from "./prefs-visible";

export interface PrefsState
	extends ThemeState,
		VimState,
		PreviewState,
		PrefsVisibleState,
		SizeState {}

export const usePrefs = (): PrefsState => {
	const theme = usePrefsTheme();
	const vim = usePrefsVim();
	const preview = usePrefsPreview();
	const size = usePrefsSize();
	const prefsVisible = usePrefsVisibleState();
	return { ...theme, ...vim, ...preview, ...prefsVisible, ...size };
};
