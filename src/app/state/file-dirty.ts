import { useEffect } from "react";
import { FileState } from "~/src/components/file/state";
import { EditorState } from "~src/components/editor/state/state";

interface Params {
	file: FileState;
	editor: EditorState;
}

export const useFileDirty = (params: Params): void => {
	const { dirty, setDirty } = params.file;
	const editor = params.editor.value;

	useEffect(() => {
		if (dirty) return;
		if (editor === null) return;
		const disposable = editor.onDidChangeModelContent(() => {
			setDirty(true);
			disposable.dispose(); // No need to listen anymore
		});
		return () => void disposable.dispose();
	}, [editor, dirty, setDirty]);
};
