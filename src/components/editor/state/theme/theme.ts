import * as monaco from "monaco-editor";
import { useEffect } from "react";
import { EditorState } from "~src/components/editor/state/state";
import { PrefsState } from "~src/components/prefs/state";
import { getThemeBaseColors } from "./base";
import { getEditorThemeColors } from "./colors";
import { getEditorThemeRules } from "./rules";

const updateTheme = (): void => {
	const base = getThemeBaseColors();
	monaco.editor.defineTheme("custom", {
		base: "vs-dark",
		inherit: false,
		colors: getEditorThemeColors(base),
		rules: getEditorThemeRules(base, { code: "colorful" }),
	});
	monaco.editor.setTheme("custom");
};

interface Params {
	editor: EditorState;
	prefs: PrefsState;
}

export const useEditorTheme = (params: Params): void => {
	const editor = params.editor.value;
	const theme = params.prefs.theme;

	useEffect(() => {
		if (editor === null) return;
		// This actually does not depend on the "editor" at all, but a global
		// option of Monaco. We intentionally ask for the "editor" instance for
		// completeness.

		// This will get the colors from getComputedStyle, which means it should
		// be delayed because it takes time for React to actually update the
		// theme class on "html"
		window.setTimeout(() => updateTheme(), 0);
	}, [theme, editor]);
};
