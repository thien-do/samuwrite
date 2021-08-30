import { FileHandle, FileState } from "~/src/components/file/state";
import { fileSystem } from "~/src/components/file/system";
import * as monaco from "monaco-editor";
import { useEffect } from "react";
import { Editor, EditorModel } from "~src/components/editor/state/state";

interface Params {
	editor: Editor | null;
	fileHandle: FileState["handle"];
}

const loadFile = (handle: FileHandle, editor: Editor): (() => void) => {
	let model: null | EditorModel = null;
	fileSystem.read(handle).then((text) => {
		model = monaco.editor.createModel(text, "markdown");
		editor.setModel(model);
	});
	return () => void model?.dispose();
};

export const useFileLoad = (params: Params): void => {
	const { fileHandle, editor } = params;

	useEffect(() => {
		if (fileHandle === null) return;
		if (editor === null) throw Error("Editor is not created");
		const dispose = loadFile(fileHandle, editor);
		return () => void dispose();
	}, [fileHandle, editor]);
};
