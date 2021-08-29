import { set } from "idb-keyval";
import * as monaco from "monaco-editor";
import { useEffect, useRef, useState } from "react";
import { readFile } from "../utils/file/read";
import s from "./app.module.css";
import { Editor as EditorComponent } from "./editor/editor";
import { Editor as EditorType, EditorModel } from "./editor/type";
import { Toolbar } from "./toolbar/toolbar";

const loadFileToEditor = (
	handle: FileSystemFileHandle,
	editor: EditorType
): (() => void) => {
	let model: null | EditorModel = null;
	readFile(handle).then((text) => {
		model = monaco.editor.createModel(text, "markdown");
		editor.setModel(model);
	});
	return () => void model?.dispose();
};

export const App = () => {
	const [handle, setHandle] = useState<FileSystemFileHandle | null>(null);
	const [editor, setEditor] = useState<EditorType | null>(null);

	// Save handle to local
	useEffect(() => {
		if (handle !== null) set("handle", handle);
	}, [handle]);

	// Load file into editor
	useEffect(() => {
		if (handle === null) return;
		if (editor === null) throw Error("Editor is not inited");
		const dispose = loadFileToEditor(handle, editor);
		return () => void dispose();
	}, [handle, editor]);

	const toolbarRef = useRef<HTMLDivElement>(null);
	const [muteToolbar, setMuteToolbar] = useState(false);
	const [showToolbar, setShowToolbar] = useState(true);

	// Hide toolbar when user starts typing or scrolling
	useEffect(() => {
		if (editor === null) return;
		const disposable: monaco.IDisposable[] = [
			editor.onDidChangeModelContent(() => void setShowToolbar(false)),
			editor.onDidScrollChange(() => void setShowToolbar(false)),
		];
		return () => disposable.forEach((d) => d.dispose());
	}, [editor]);

	// Show toolbar on hover (note that we don't auto hide toolbar on mouse out)
	useEffect(() => {
		const toolbar = toolbarRef.current;
		if (toolbar === null) throw Error("Toolbar ref is null");
		const listener = () => void setShowToolbar(true);
		toolbar.addEventListener("mouseover", listener);
		return () => toolbar.removeEventListener("mouseover", listener);
	}, []);

	// Mute/cancel mouse events on toolbar while user is interacting with the
	// editor with their mouse (e.g. drag to copy)
	useEffect(() => {
		if (editor === null) return;
		const disposable: monaco.IDisposable[] = [
			editor.onMouseDown(() => void setMuteToolbar(true)),
			editor.onMouseUp(() => void setMuteToolbar(false)),
		];
		return () => disposable.forEach((d) => d.dispose());
	}, [editor]);

	return (
		<div className={s.app}>
			<div
				className={[s.toolbar, muteToolbar ? s.muted : ""].join(" ")}
				ref={toolbarRef}
			>
				<Toolbar
					show={showToolbar}
					editor={editor}
					handle={handle}
					setHandle={setHandle}
				/>
			</div>
			<div className={s.editor}>
				<EditorComponent setEditor={setEditor} />
			</div>
		</div>
	);
};
