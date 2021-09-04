import { LayoutState, usePrefsLayout } from "./layout";
import { SizeState, usePrefsSize } from "./size/state";
import { ThemeState, usePrefsTheme } from "./theme/state";
import { VimState, usePrefsVim } from "./vim";

export interface PrefsState
	extends ThemeState,
		VimState,
		LayoutState,
		SizeState {}

export const usePrefs = (): PrefsState => {
	const theme = usePrefsTheme();
	const vim = usePrefsVim();
	const layout = usePrefsLayout();
	const size = usePrefsSize();
	return { ...theme, ...vim, ...layout, ...size };
};
