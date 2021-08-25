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
		// To ensure the font is loaded correctly
		value: "Hello _world_",
		language: "markdown",
		// model: null,

		ariaLabel: "Main markdown editor",
		codeLens: false,
		contextmenu: false,
		copyWithSyntaxHighlighting: false,
		cursorBlinking: "solid",
		cursorSmoothCaretAnimation: true,
		cursorSurroundingLines: 3,
		cursorWidth: 3,
		fontFamily: "iA Writer Duo",
		fontLigatures: true,
		fontSize: 24,
		fontWeight: "450",
		glyphMargin: false,
		// letterSpacing: 0.5,
		lineHeight: 48,
		lineNumbers: "interval",
		minimap: { enabled: false },
		padding: { top: 150 },
		quickSuggestions: false,
		roundedSelection: false,
		selectionHighlight: false,
		smoothScrolling: true,
		snippetSuggestions: "none",
		suggestOnTriggerCharacters: false,
		wordBasedSuggestions: false,
		wordWrap: "on",
	});

	const vimMode = initVimMode(editor, containers.status);

	return { editor, vimMode };
};
