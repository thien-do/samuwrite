import { useStorageState } from "~src/utils/state/storage";
import { SetState } from "~src/utils/state/type";
import { EditorState } from "~src/components/editor/state/state";
import { RefObject, useEffect, useRef } from "react";
import { initVimMode } from "monaco-vim";
import { PrefsState } from "~src/components/prefs/state";

export interface VimState {
	vim: boolean;
	setVim: SetState<boolean>;
}

interface Params {
	editor: EditorState;
	prefs: PrefsState;
}

interface VimModeState {
	statusElmRef: RefObject<HTMLDivElement>;
}

export const useVimMode = (params: Params): VimModeState => {
	const prefs = params.prefs;
	const { value: editor } = params.editor;

	const statusElmRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (statusElmRef.current === null)
			throw Error("Status element ref is null");
		if (editor === null || !prefs.vim) return;

		const disposable = initVimMode(editor, statusElmRef.current);
		return () => disposable.dispose();
	}, [editor, prefs.vim]);

	return { statusElmRef };
};

export const usePrefsVim = (): VimState => {
	const [vim, setVim] = useStorageState({
		storageKey: "vim",
		defaultValue: false,
	});
	return { vim, setVim };
};
