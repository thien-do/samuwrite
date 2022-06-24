import { useStorageState } from "~/src/lib/utils/state/storage";
import { SetState } from "~/src/lib/utils/state/type";
import { ThemeName } from "./theme";

export interface ThemePrefsState {
  theme: ThemeName;
  setTheme: SetState<ThemeName>;
}

export const useThemePrefs = (): ThemePrefsState => {
  const [theme, setTheme] = useStorageState<ThemeName>({
    storageKey: "theme",
    defaultValue: "bushido",
  });

  return { theme, setTheme };
};
