import { FileState } from "~/src/components/file/state";
import { useEffect } from "react";
import { Editor } from "~src/components/editor/state/state";

interface Params {
	setFileDirty: FileState["setDirty"];
	editor: Editor | null;
}

export const useFileDirty = (params: Params): void => {
	const { setFileDirty, editor } = params;
	useEffect(() => {
		if (editor === null) return;
		const dirty = editor.onDidChangeModelContent(() => {
			setFileDirty(true);
		});
		return () => void dirty.dispose();
	}, [editor]);
};
