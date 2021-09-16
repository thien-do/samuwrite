import Color from "color";
import { ThemeDetail } from "../theme";

export const paper: ThemeDetail = {
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
};
