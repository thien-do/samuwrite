import { readFile } from "../file/read";
import { Handle, useFileHandle } from "../file/use-handle";
import { Editor, EditorModel } from "./editor/state/state";
import * as monaco from "monaco-editor";
import { Dispatch, SetStateAction, useEffect } from "react";

interface Params {
	editor: Editor | null;
}

interface AppFileState {
	handle: Handle | null;
	setHandle: Dispatch<SetStateAction<Handle | null>>;
}

const loadFile = (handle: Handle, editor: Editor): (() => void) => {
	let model: null | EditorModel = null;
	readFile(handle).then((text) => {
		model = monaco.editor.createModel(text, "markdown");
		editor.setModel(model);
	});
	return () => void model?.dispose();
};

export const useAppFile = (params: Params): AppFileState => {
	const { editor } = params;

	const { handle, setHandle } = useFileHandle();

	// Load file into editor
	useEffect(() => {
		if (handle === null) return;
		if (editor === null) throw Error("Editor is not inited");
		const dispose = loadFile(handle, editor);
		return () => void dispose();
	}, [handle, editor]);

	return { handle, setHandle };
};
