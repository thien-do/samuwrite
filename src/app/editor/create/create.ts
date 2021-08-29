import * as monaco from "monaco-editor";
import { ensureEditorEnv } from "./env";
import { Editor } from "../state/state";
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

export const getLeftPadding = (container: HTMLDivElement) => {
	return Math.max((container.clientWidth - 1000) / 2, 24);
};

export const createEditor = (options: Options): Result => {
	ensureEditorEnv();

	const editor = monaco.editor.create(options.editor, {
		value: "",
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
		fontWeight: "450",
		glyphMargin: false,
		lineDecorationsWidth: getLeftPadding(options.editor),
		disableMonospaceOptimizations: true,
		fontSize: 20,
		lineHeight: 40,
		lineNumbers: "off",
		minimap: { enabled: false },
		padding: { top: 150, bottom: 150 },
		quickSuggestions: false,
		roundedSelection: false,
		selectionHighlight: false,
		smoothScrolling: true,
		snippetSuggestions: "none",
		suggestOnTriggerCharacters: false,
		wordBasedSuggestions: false,
		wordWrap: "bounded",
		scrollBeyondLastLine: false,
		wordWrapColumn: 80,
		folding: false,
		occurrencesHighlight: false,
		renderLineHighlight: "none",
		hideCursorInOverviewRuler: true,
		overviewRulerBorder: false,
		scrollbar: {
			useShadows: false,
			horizontal: "hidden",
			verticalSliderSize: 5,
		},
	});

	const vimMode = options.vim ? initVimMode(editor, options.status) : null;

	return { editor, vimMode };
};
