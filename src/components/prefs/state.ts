import { PreviewPrefsState, usePreviewPrefs } from "../preview/state/prefs";
import { ThemePrefsState, useThemePrefs } from "../theme/state";
import { PrefsVisibleState, usePrefsVisibleState } from "./prefs-visible";
import { SizeState, usePrefsSize } from "./size/state";
import { usePrefsVim, VimState } from "./vim";

export interface PrefsState
	extends ThemePrefsState,
		PreviewPrefsState,
		VimState,
		SizeState,
		PrefsVisibleState {}

export const usePrefs = (): PrefsState => ({
	...useThemePrefs(),
	...usePreviewPrefs(),

	...usePrefsVim(),
	...usePrefsSize(),
	...usePrefsVisibleState(),
});
