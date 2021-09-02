import { useRef } from "react";
import { useEditorInit } from "./state/init/init";
import { useEditorLayout } from "./state/layout";
import { EditorState } from "./state/state";
import "./style/editor.global.css";
import s from "./style/editor.module.css";
import "./style/font/font.css";

interface Props {
	editor: EditorState;
}

export const Editor = (props: Props): JSX.Element => {
	const { set: setEditor, value: editor } = props.editor;

	const containerRef = useRef<HTMLDivElement>(null);
	const statusRef = useRef<HTMLDivElement>(null);

	useEditorInit({ containerRef, setEditor });
	useEditorLayout({ containerRef, editor });

	return (
		<div className={s.container}>
			<div className={s.editor} ref={containerRef} />
			<div className={s.status} ref={statusRef} />
		</div>
	);
};
