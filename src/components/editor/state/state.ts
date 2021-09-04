import * as monaco from "monaco-editor";
import { Dispatch, SetStateAction, useState } from "react";

export type Editor = monaco.editor.IStandaloneCodeEditor;

export type EditorModel = monaco.editor.ITextModel;

export type EditorOptions = monaco.editor.IStandaloneEditorConstructionOptions;

export interface EditorState {
	value: Editor | null;
	set: Dispatch<SetStateAction<Editor | null>>;
}

/**
 * The Editor instance. This should be defined at a high level component (e.g.
 * App) so other components may use it as well.
 */
export const useEditor = (): EditorState => {
	const [value, set] = useState<Editor | null>(null);
	return { value, set };
};
