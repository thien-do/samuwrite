import * as monaco from "monaco-editor";
import { RefObject, useEffect, useRef } from "react";
import { getRef } from "~/src/utils/ref";
import { createEditor, getLeftPadding } from "./create/create";
import "./editor.css";
import s from "./editor.module.css";
import "./font/font.css";
import { defineEditorTheme } from "./theme/theme";
import { EditorState } from "./state/state";

interface Props {
	editor: EditorState;
}

const getContainer = (ref: RefObject<HTMLDivElement>): HTMLDivElement => {
	const container = ref.current;
	if (container === null) throw Error("Ref container is null");
	return container;
};

export const Editor = (props: Props) => {
	const { set: setEditor, value: editor } = props.editor;

	const editorContainerRef = useRef<HTMLDivElement>(null);
	const statusContainerRef = useRef<HTMLDivElement>(null);

	// Apply editor font
	useEffect(() => {
		document.fonts.ready.then(() => {
			monaco.editor.remeasureFonts();
		});
	}, []);

	// Apply editor theme
	useEffect(() => {
		defineEditorTheme();
	}, []);

	// Create editor
	useEffect(() => {
		const { editor, vimMode } = createEditor({
			editor: getContainer(editorContainerRef),
			status: getContainer(statusContainerRef),
			vim: false,
		});
		editor.focus();
		setEditor(editor);
		return () => {
			setEditor(null);
			vimMode?.dispose();
			editor.dispose();
		};
	}, [setEditor]);

	// Re-calculate editor layout when container changes
	useEffect(() => {
		if (editor === null) return;
		const container = getRef(editorContainerRef, "Container is null");
		const observer = new ResizeObserver(() => {
			editor.layout();
			editor.updateOptions({
				lineDecorationsWidth: getLeftPadding(container),
			});
		});
		observer.observe(container);
		return () => void observer.unobserve(container);
	}, [editor]);

	return (
		<div className={s.container}>
			<div className={s.editor} ref={editorContainerRef} />
			<div className={s.status} ref={statusContainerRef} />
		</div>
	);
};
