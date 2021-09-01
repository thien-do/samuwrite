import { useEffect } from "react";
import { SetState } from "~src/utils/state/type";
import { useStorageState } from "~src/utils/state/storage";
import "./styles/bushido.css";
import "./styles/serika-dark.css";

export const THEMES = ["bushido", "serika-dark"] as const;

export type Theme = typeof THEMES[number];

export interface ThemeState {
	theme: Theme;
	setTheme: SetState<Theme>;
}

const htmlClass = document.documentElement.classList;

const useThemeApply = (theme: Theme): void => {
	useEffect(() => {
		htmlClass.add(`theme-${theme}`);
		return () => htmlClass.remove(`theme-${theme}`);
	}, [theme]);
};

export const usePrefsTheme = (): ThemeState => {
	const [theme, setTheme] = useStorageState<Theme>({
		storageKey: "theme",
		defaultValue: "bushido",
	});

	useThemeApply(theme);

	return { theme, setTheme };
};
