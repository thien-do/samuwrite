import * as monaco from "monaco-editor";
import { MutableRefObject, RefObject, useEffect, useRef } from "react";
import s from "./editor.module.css";
// @ts-ignore
import { initVimMode } from "monaco-vim";

const MonacoEnvironment: monaco.Environment = {
	getWorkerUrl: function (_moduleId, _label) {
		return "/editor.worker.js";
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
	editor: RefObject<HTMLDivElement>;
	status: RefObject<HTMLDivElement>;
}

const createEditor = (containers: Containers): Instance => {
	const editorContainer = containers.editor.current;
	if (editorContainer === null) throw Error("Editor container is null");
	const editor = monaco.editor.create(editorContainer, {
		value: "Hello world",
		language: "markdown",
	});

	const statusContainer = containers.status.current;
	if (statusContainer === null) throw Error("Status container is null");
	const vimMode = initVimMode(editor, statusContainer);

	return { editor, vimMode };
};

interface Props {
	editorRef: MutableRefObject<monaco.editor.IStandaloneCodeEditor | null>;
}

export const Editor = (props: Props) => {
	const editorContainerRef = useRef<HTMLDivElement>(null);
	const statusContainerRef = useRef<HTMLDivElement>(null);

	const { editorRef } = props;
	useEffect(() => {
		ensureEditorEnv();
		const { editor, vimMode } = createEditor({
			editor: editorContainerRef,
			status: statusContainerRef,
		});
		editorRef.current = editor;
		return () => {
			editor.dispose();
			vimMode.dispose();
		};
	}, [editorRef]);

	return (
		<div className={s.container}>
			<div className={s.editor} ref={editorContainerRef} />
			<div className={s.status} ref={statusContainerRef} />
		</div>
	);
};
