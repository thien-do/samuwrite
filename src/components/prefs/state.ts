import { PreviewState, usePrefsPreview } from "./preview";
import { SizeState, usePrefsSize } from "./size/state";
import { ThemeState, usePrefsTheme } from "../theme/state";
import { VimState, usePrefsVim } from "./vim";

export interface PrefsState
	extends ThemeState,
		VimState,
		PreviewState,
		SizeState {}

export const usePrefs = (): PrefsState => {
	const theme = usePrefsTheme();
	const vim = usePrefsVim();
	const preview = usePrefsPreview();
	const size = usePrefsSize();
	return { ...theme, ...vim, ...preview, ...size };
};
