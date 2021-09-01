import { FileHandle, FileState } from "~/src/components/file/state";
import { fileSystem } from "~/src/components/file/system";
import * as monaco from "monaco-editor";
import { useEffect } from "react";
import {
	Editor,
	EditorModel,
	EditorState,
} from "~src/components/editor/state/state";

interface Params {
	editor: EditorState;
	file: FileState;
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
	const handle = params.file.handle;
	const editor = params.editor.value;

	useEffect(() => {
		if (handle === null) return;
		if (editor === null) throw Error("Editor is not created");
		const dispose = loadFile(handle, editor);
		return () => void dispose();
	}, [handle, editor]);
};
