import * as monaco from "monaco-editor";
import { ensureEditorEnv } from "./env";
import { Editor, EditorState } from "../state";
import { RefObject, useEffect } from "react";
import { getRef } from "~src/utils/ref";
import { EDITOR_STATIC_OPTIONS } from "./options";

interface Options {
	container: HTMLDivElement;
}

const createEditor = ({ container }: Options): Editor => {
	ensureEditorEnv();
	const editor = monaco.editor.create(container, EDITOR_STATIC_OPTIONS);
	return editor;
};

interface Params {
	containerRef: RefObject<HTMLDivElement>;
	editor: EditorState;
}

export const useEditorInit = (params: Params): void => {
	const { containerRef } = params;
	const setEditor = params.editor.set;

	useEffect(() => {
		const container = getRef(containerRef, "editor container is null");
		const editor = createEditor({ container });
		editor.focus();
		setEditor(editor);
		return () => {
			setEditor(null);
			editor.dispose();
		};
	}, [setEditor, containerRef]);
};
