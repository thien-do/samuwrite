import { EditorState } from "~src/components/editor/state/state";
import { RefObject, useEffect, useRef } from "react";
import { initVimMode } from "monaco-vim";
import { PrefsState } from "~src/components/prefs/state";

interface Params {
	editor: EditorState;
	prefs: PrefsState;
	statusRef: RefObject<HTMLDivElement>;
}

interface VimModeState {
	statusRef: RefObject<HTMLDivElement>;
}

export const useEditorVim = (params: Params): VimModeState => {
	const editor = params.editor.value;
	const vim = params.prefs.vim;
	const statusRef = params.statusRef;

	useEffect(() => {
		const status = statusRef.current;
		if (status === null) throw Error("Status element is null");
		if (editor === null) return;
		if (vim === false) return;

		const disposable = initVimMode(editor, status);
		return () => disposable.dispose();
	}, [editor, vim]);

	return { statusRef };
};
