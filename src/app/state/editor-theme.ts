import { useEffect } from "react";
import { EditorState } from "~src/components/editor/state/state";
import { defineEditorTheme } from "~src/components/editor/state/theme/theme";
import { PrefsState } from "~src/components/prefs/state";

interface Params {
	editor: EditorState;
	prefs: PrefsState;
}

export const useEditorTheme = (params: Params): void => {
	const editor = params.editor.value;
	const theme = params.prefs.theme;

	useEffect(() => {
		if (editor === null) return;
		defineEditorTheme();
	}, [theme, editor]);
};
