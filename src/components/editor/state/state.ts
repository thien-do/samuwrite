import * as monaco from "monaco-editor";
import { Dispatch, SetStateAction, useState } from "react";

export type Editor = monaco.editor.IStandaloneCodeEditor;

export type EditorModel = monaco.editor.ITextModel;

export interface EditorState {
	value: Editor | null;
	set: Dispatch<SetStateAction<Editor | null>>;
}

export const useEditor = (): EditorState => {
	const [value, set] = useState<Editor | null>(null);
	return { value, set };
};
