import * as monaco from "monaco-editor";
import { ensureEditorEnv } from "./env";
import { Editor } from "../state/state";
import { initVimMode, EditorVimMode } from "monaco-vim";
import { getEditorOptions } from "./options";

interface Options {
	editor: HTMLDivElement;
	status: HTMLDivElement;
	vim: boolean;
}

interface Result {
	vimMode: EditorVimMode | null;
	editor: Editor;
}

export const createEditor = (options: Options): Result => {
	ensureEditorEnv();

	const editorOptions = getEditorOptions(options.editor);
	const editor = monaco.editor.create(options.editor, editorOptions);

	const vimMode = options.vim ? initVimMode(editor, options.status) : null;

	return { editor, vimMode };
};
