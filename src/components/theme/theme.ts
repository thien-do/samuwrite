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

export interface ThemeDetail {
	name: string;
	description: string;
	// Actually this can be calculated using colors.bg.isDark() but it's better
	// (in performance and in semantic) as a static field. Also, we should
	// support "high contrast" in the future
	scheme: "light" | "dark";
	colors: ThemeColors;
}

// This may change over time
export const THEME_DETAILS: Record<ThemeName, ThemeDetail> = {
	bushido: {
		name: "Bushido",
		description: "",
		scheme: "dark",
		colors: {
			bg: Color("#242933"),
			main: Color("#ec4c56"),
			caret: Color("#ec4c56"),
			sub: Color("#596172"),
			text: Color("#f6f0e9"),
			error: Color("#ec4c56"),
		},
	},
	"serika-dark": {
		name: "Serika Dark",
		description: "",
		scheme: "dark",
		colors: {
			bg: Color("#323437"),
			main: Color("#e2b714"),
			caret: Color("#e2b714"),
			sub: Color("#646669"),
			text: Color("#d1d0c5"),
			error: Color("#ca4754"),
		},
	},
	paper: {
		name: "Paper",
		description: "",
		scheme: "light",
		colors: {
			bg: Color("#eeeeee"),
			main: Color("#444444"),
			caret: Color("#3B82F6"),
			sub: Color("#b2b2b2"),
			text: Color("#444444"),
			error: Color("#d70000"),
		},
	},
	"rose-pine-dawn": {
		name: "Rosé Pine Dawn",
		description: "",
		scheme: "light",
		colors: {
			bg: Color("#faf4ed"),
			main: Color("#d7827e"),
			caret: Color("#d7827e"),
			sub: Color("#b0acb9"),
			text: Color("#575279"),
			error: Color("#b4637a"),
		},
	},
};
