import { PreviewLayoutState, usePreviewLayout } from "../preview/layout/state";
import { ThemePrefsState, useThemePrefs } from "../theme/state";
import { PrefsVisibleState, usePrefsVisibleState } from "./prefs-visible";
import { SizeState, usePrefsSize } from "./size/state";
import { usePrefsVim, VimState } from "./vim";

export interface PrefsState
	extends ThemePrefsState,
		PreviewLayoutState,
		VimState,
		SizeState,
		PrefsVisibleState {}

export const usePrefs = (): PrefsState => ({
	...useThemePrefs(),
	...usePreviewLayout(),

	...usePrefsVim(),
	...usePrefsSize(),
	...usePrefsVisibleState(),
});
