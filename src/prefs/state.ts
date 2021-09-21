import {
	PreviewTemplateState,
	usePreviewTemplateState,
} from "~src/preview/template/state";
import {
	PreviewLayoutState,
	usePreviewLayoutState,
} from "../preview/layout/state";
import { ThemePrefsState, useThemePrefs } from "../theme/state";
import { PrefsVisibleState, usePrefsVisibleState } from "./prefs-visible";
import { SizeState, usePrefsSize } from "./size/state";
import { usePrefsVim, VimState } from "./vim";

export interface PrefsState
	extends ThemePrefsState,
		PreviewLayoutState,
		PreviewTemplateState,
		VimState,
		SizeState,
		PrefsVisibleState {}

export const usePrefs = (): PrefsState => ({
	...useThemePrefs(),
	...usePreviewLayoutState(),
	...usePreviewTemplateState(),

	...usePrefsVim(),
	...usePrefsSize(),
	...usePrefsVisibleState(),
});
