import { RefObject, useEffect, useRef } from "react";
import * as monaco from "monaco-editor";
import { createEditor } from "./create";
import s from "./editor.module.css";
import "./editor.css";
import { Editor as EditorType } from "./type";
import "./font/font.css";

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

	useEffect(() => {
		document.fonts.ready.then(() => {
			monaco.editor.remeasureFonts();
		});
	}, []);

	const { setEditor } = props;
	useEffect(() => {
		const { editor, vimMode } = createEditor({
			editor: getContainer(editorContainerRef),
			status: getContainer(statusContainerRef),
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
