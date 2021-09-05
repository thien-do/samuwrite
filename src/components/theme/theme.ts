import Color from "color";

export const THEME_NAMES = [
	"bushido",
	"serika-dark",
	"paper",
	"rose-pine-dawn",
] as const;

// This is stored in user preferences
export type ThemeName = typeof THEME_NAMES[number];

export interface ThemeColors {
	bg: Color;
	main: Color;
	caret: Color;
	sub: Color;
	text: Color;
	error: Color;
}

// This may change over time
export const THEME_COLORS: Record<ThemeName, ThemeColors> = {
	bushido: {
		bg: Color("#242933"),
		main: Color("#ec4c56"),
		caret: Color("#ec4c56"),
		sub: Color("#596172"),
		text: Color("#f6f0e9"),
		error: Color("#ec4c56"),
	},
	"serika-dark": {
		bg: Color("#323437"),
		main: Color("#e2b714"),
		caret: Color("#e2b714"),
		sub: Color("#646669"),
		text: Color("#d1d0c5"),
		error: Color("#ca4754"),
	},
	paper: {
		bg: Color("#eeeeee"),
		main: Color("#444444"),
		caret: Color("#3B82F6"),
		sub: Color("#b2b2b2"),
		text: Color("#444444"),
		error: Color("#d70000"),
	},
	"rose-pine-dawn": {
		bg: Color("#faf4ed"),
		main: Color("#d7827e"),
		caret: Color("#d7827e"),
		sub: Color("#9893a5"),
		text: Color("#575279"),
		error: Color("#b4637a"),
	},
};
