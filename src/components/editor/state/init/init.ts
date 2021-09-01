import * as monaco from "monaco-editor";
import { ensureEditorEnv } from "./env";
import { Editor } from "../state";
import { getEditorOptions } from "./options";
import { RefObject, useEffect } from "react";
import { getRef } from "~src/utils/ref";
import { SetState } from "~src/utils/state/type";

interface Options {
	container: HTMLDivElement;
}

const createEditor = ({ container }: Options): Editor => {
	ensureEditorEnv();
	const options = getEditorOptions(container);
	const editor = monaco.editor.create(container, options);
	return editor;
};

interface Params {
	containerRef: RefObject<HTMLDivElement>;
	setEditor: SetState<Editor | null>;
}

export const useEditorInit = (params: Params): void => {
	const { containerRef, setEditor } = params;

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
