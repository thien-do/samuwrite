import * as monaco from "monaco-editor";
import { RefObject, useEffect, useRef } from "react";
import { createEditor } from "./create";
import "./editor.css";
import s from "./editor.module.css";
import "./font/font.css";
import { defineEditorTheme } from "./theme/theme";
import { Editor as EditorType } from "./type";

interface Props {
	setEditor: (editor: EditorType) => void;
}

const getContainer = (ref: RefObject<HTMLDivElement>): HTMLDivElement => {
	const container = ref.current;
	if (container === null) throw Error("Ref container is null");
	return container;
};

export const Editor = (props: Props) => {
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

	const { setEditor } = props;
	useEffect(() => {
		const { editor, vimMode } = createEditor({
			editor: getContainer(editorContainerRef),
			status: getContainer(statusContainerRef),
			vim: false,
		});
		setEditor(editor);
		return () => {
			vimMode?.dispose();
			editor.dispose();
		};
	}, [setEditor]);

	return (
		<div className={s.container}>
			<div className={s.editor} ref={editorContainerRef} />
			<div className={s.status} ref={statusContainerRef} />
		</div>
	);
};
