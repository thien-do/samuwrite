import * as monaco from "monaco-editor";
import { useEffect } from "react";
import { EditorState } from "~src/components/editor/state/state";
import { PrefsState } from "~src/components/prefs/state";
import { THEME_DETAILS } from "~src/components/theme/theme";
import { getEditorThemeColors } from "./colors";
import { getEditorThemeRules } from "./rules";

interface Params {
	editor: EditorState;
	prefs: PrefsState;
}

export const useEditorTheme = (params: Params): void => {
	const editor = params.editor.value;
	const name = params.prefs.theme;

	useEffect(() => {
		if (editor === null) return;
		// This actually does not depend on the "editor" at all, but a global
		// option of Monaco. We intentionally ask for the "editor" instance for
		// completeness.

		const detail = THEME_DETAILS[name];
		const colors = detail.colors;
		monaco.editor.defineTheme("custom", {
			base: detail.scheme === "light" ? "vs" : "vs-dark",
			inherit: false,
			colors: getEditorThemeColors(colors), // UI colors
			rules: getEditorThemeRules(colors, { code: "colorful" }), // Token colors
		});
		monaco.editor.setTheme("custom");
	}, [name, editor]);
};
