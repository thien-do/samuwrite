import Color from "color";
import * as details from "./details/details";

export const THEME_NAMES = [
	"bushido",
	"serika-dark",
	"dracula",
	"nord",
	"high-contrast",

	"paper",
	"serika-light",
	"rose-pine-dawn",
	"peach",
	"zumidori",
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
	scheme: "light" | "dark" | "high-contrast";
	colors: ThemeColors;
}

// This may change over time
export const THEME_DETAILS: Record<ThemeName, ThemeDetail> = {
	bushido: details.bushido,
	"serika-dark": details.serikaDark,
	dracula: details.dracula,
	nord: details.nord,
	"high-contrast": details.highContrast,

	paper: details.paper,
	"serika-light": details.serikaLight,
	"rose-pine-dawn": details.rosePineDawn,
	peach: details.peach,
	zumidori: details.zumidori,
};
