import { LayoutState, usePrefsLayout } from "./layout";
import { SizeState, usePrefsSize } from "./size/state";
import { ThemeState, useThemeState } from "../theme/state";
import { VimState, usePrefsVim } from "./vim";

export interface PrefsState
	extends ThemeState,
		VimState,
		LayoutState,
		SizeState {}

export const usePrefs = (): PrefsState => {
	const theme = useThemeState();
	const vim = usePrefsVim();
	const layout = usePrefsLayout();
	const size = usePrefsSize();
	return { ...theme, ...vim, ...layout, ...size };
};
