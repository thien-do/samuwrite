import * as monaco from "monaco-editor";
// @ts-ignore
import { initVimMode } from "monaco-vim";
import { ensureEditorEnv } from "./env";
import { Editor, EditorVimMode } from "./type";

interface Containers {
	editor: HTMLDivElement;
	status: HTMLDivElement;
}

interface Result {
	vimMode: EditorVimMode;
	editor: Editor;
}

export const createEditor = (containers: Containers): Result => {
	ensureEditorEnv();

	const editor = monaco.editor.create(containers.editor, {
		model: null,
		ariaLabel: "Main markdown editor",
		codeLens: false,
		contextmenu: false,
		copyWithSyntaxHighlighting: false,
	});

	const vimMode = initVimMode(editor, containers.status);

	return { editor, vimMode };
};
