import { useStorageState } from "~src/utils/state/storage";
import { SetState } from "~src/utils/state/type";
import { ThemeName } from "./theme";

export interface ThemeState {
	theme: ThemeName;
	setTheme: SetState<ThemeName>;
}

export const usePrefsTheme = (): ThemeState => {
	const [theme, setTheme] = useStorageState<ThemeName>({
		storageKey: "theme",
		defaultValue: "bushido",
	});

	return { theme, setTheme };
};
