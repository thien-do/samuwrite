import * as monaco from "monaco-editor";
import { ensureEditorEnv } from "./env";
import { Editor } from "./type";
import { initVimMode, EditorVimMode } from "monaco-vim";

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

	const editor = monaco.editor.create(options.editor, {
		// To ensure the font is loaded correctly
		value: "Hello _world_",
		language: "markdown",

		ariaLabel: "Main markdown editor",
		codeLens: false,
		contextmenu: false,
		copyWithSyntaxHighlighting: false,
		cursorBlinking: "smooth",
		cursorSmoothCaretAnimation: true,
		cursorSurroundingLines: 3,
		cursorWidth: 3,
		fontFamily: "iA Writer Duo",
		fontLigatures: true,
		fontSize: 20,
		fontWeight: "450",
		glyphMargin: false,
		lineHeight: 40,
		lineNumbers: "off",
		minimap: { enabled: false },
		padding: { top: 150 },
		quickSuggestions: false,
		roundedSelection: false,
		selectionHighlight: false,
		smoothScrolling: true,
		snippetSuggestions: "none",
		suggestOnTriggerCharacters: false,
		wordBasedSuggestions: false,
		wordWrap: "bounded",
		wordWrapColumn: 80,
		occurrencesHighlight: false,
		renderLineHighlight: "none",
		hideCursorInOverviewRuler: true,
		overviewRulerBorder: false,
		scrollbar: { horizontal: "hidden", verticalSliderSize: 5 },
	});

	const vimMode = options.vim ? initVimMode(editor, options.status) : null;

	return { editor, vimMode };
};
