import * as monaco from "monaco-editor";
import { useEffect, useRef } from "react";
import * as s from "./editor.module.css";
// @ts-ignore
import { initVimMode } from "monaco-vim";

const MonacoEnvironment: monaco.Environment = {
	getWorkerUrl: function (_moduleId, _label) {
		return "/workers/editor.worker.js";
	},
};

const ensureEditorEnv = () => {
	if ((self as any).MonacoEnvironment !== MonacoEnvironment) {
		(self as any).MonacoEnvironment = MonacoEnvironment;
	}
};

interface Instance {
	editor: monaco.editor.IStandaloneCodeEditor;
	vimMode: any;
}

interface Containers {
	editor: HTMLElement;
	status: HTMLElement;
}

const createEditor = (containers: Containers): Instance => {
	const editor = monaco.editor.create(containers.editor, {
		value: "Hello world",
		language: "markdown",
	});
	const vimMode = initVimMode(editor, containers.status);
	return { editor, vimMode };
};

export const Editor = () => {
	const editorRef = useRef<HTMLDivElement | null>(null);
	const statusRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const [editor, status] = [editorRef.current, statusRef.current];
		if (editor === null) throw Error("Editor container is null");
		if (status === null) throw Error("Status container is null");
		ensureEditorEnv();
		const instance = createEditor({ editor, status });
		return () => {
			instance.editor.dispose();
			instance.vimMode.dispose();
		};
	}, []);

	return (
		<div className={s.container}>
			<div className={s.editor} ref={editorRef} />
			<div className={s.status} ref={statusRef} />
		</div>
	);
};
