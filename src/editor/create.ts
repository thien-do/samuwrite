import * as monaco from "monaco-editor";
import { ensureEditorEnv } from "./env";
import { Editor, EditorVimMode } from "./type";

interface Containers {
	editor: HTMLDivElement;
	status: HTMLDivElement;
}

interface Result {
	vimMode: EditorVimMode | null;
	editor: Editor;
}

export const createEditor = (containers: Containers): Result => {
	ensureEditorEnv();

	const editor = monaco.editor.create(containers.editor, {
		// To ensure the font is loaded correctly
		value: "Hello _world_",
		language: "markdown",

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
		fontSize: 20,
		fontWeight: "450",
		glyphMargin: false,
		lineHeight: 36,
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

	// const vimMode = initVimMode(editor, containers.status);
	const vimMode = null;

	return { editor, vimMode };
};
