import { set } from "idb-keyval";
import * as monaco from "monaco-editor";
import { useEffect, useRef, useState } from "react";
import { Editor as EditorComponent } from "./editor/editor";
import { Editor as EditorType, EditorModel } from "./editor/type";
import { readFile } from "../utils/file/read";
import { Toolbar } from "./toolbar/toolbar";
import s from "./app.module.css";

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
	const toolbarRef = useRef<HTMLDivElement>(null);
	const isMouseDown = useRef<boolean>(false);

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

	const hideToolbar = () => toolbarRef.current?.classList.add(s.hideToolbar);
	const showToolbar = () => toolbarRef.current?.classList.remove(s.hideToolbar);

	const disableToolbarPointerEvents = () =>
		toolbarRef.current?.classList.add(s.disablePointerEvent);
	const enableToolbarPointerEvents = () =>
		toolbarRef.current?.classList.remove(s.disablePointerEvent);

	// Show toolbar on mouseover
	useEffect(() => {
		if (toolbarRef === null) return;
		toolbarRef.current?.addEventListener("mouseover", showToolbar);
		return () =>
			toolbarRef.current?.removeEventListener("mouseover", showToolbar);
	}, [toolbarRef]);

	const onMouseEvent = (type: "mouseup" | "mousedown") => {
		const mouseDown = type === "mousedown";
		isMouseDown.current = mouseDown;
		if (mouseDown) {
			disableToolbarPointerEvents();
		} else {
			enableToolbarPointerEvents();
		}
	};

	// Hide toolbar when scrolling or typing
	useEffect(() => {
		if (editor === null) return;
		const disposable = [
			editor.onDidScrollChange(() => hideToolbar()),
			editor.onDidChangeModelContent(() => hideToolbar()),
			editor.onMouseUp(() => onMouseEvent("mouseup")),
			editor.onMouseDown(() => onMouseEvent("mousedown")),
		];
		return () => disposable.forEach((d) => d.dispose());
	}, [editor]);

	return (
		<div className={s.app}>
			<div ref={toolbarRef} className={s.toolbarWrapper}>
				<div className={s.toolbar}>
					<Toolbar editor={editor} handle={handle} setHandle={setHandle} />
				</div>
			</div>
			<div className={s.editor}>
				<EditorComponent setEditor={setEditor} />
			</div>
		</div>
	);
};
