export const themeBaseColorKeys = [
	"bg",
	"main",
	"caret",
	"sub",
	"text",
	"error",
] as const;

export type ThemeBaseColorKey = typeof themeBaseColorKeys[number];

export type ThemeBaseColors = Record<ThemeBaseColorKey, string>;

export const getThemeBaseColors = (): ThemeBaseColors => {
	const styles = window.getComputedStyle(document.body);
	const map: ThemeBaseColors = themeBaseColorKeys.reduce((prev, key) => {
		prev[key] = styles.getPropertyValue(`--${key}-color`).trim();
		return prev;
	}, {} as ThemeBaseColors);
	return map;
};
