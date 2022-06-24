import Color from "color";
import { ThemeDetail } from "../theme";

export const highContrast: ThemeDetail = {
	name: "High contrast",
	description: "",
	scheme: "high-contrast",
	colors: {
		bg: Color("#000000"),
		main: Color("#1aebff"),
		caret: Color("#ffffff"),
		sub: Color("#1aebff"),
		text: Color("#ffffff"),
		error: Color("#e11845"),
	},
};
