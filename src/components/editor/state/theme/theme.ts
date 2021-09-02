import * as monaco from "monaco-editor";
import { getThemeBaseColors } from "./base";
import { getEditorThemeColors } from "./colors";
import { getEditorThemeRules } from "./rules";

export const defineEditorTheme = (): void => {
	const base = getThemeBaseColors();
	monaco.editor.defineTheme("custom", {
		base: "vs-dark",
		inherit: false,
		colors: getEditorThemeColors(base),
		rules: getEditorThemeRules(base, { code: "colorful" }),
	});
	monaco.editor.setTheme("custom");
};
