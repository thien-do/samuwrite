import { useRef } from "react";
import { FileState } from "../file/state";
import { PrefsState } from "../prefs/state";
import { useEditorFile } from "./state/file";
import { useEditorInit } from "./state/init/init";
import { useEditorLayout } from "./state/layout";
import { EditorState } from "./state/state";
import { useEditorTheme } from "./state/theme/theme";
import { useEditorVim } from "./state/vim";
import "./style/editor.global.css";
import s from "./style/editor.module.css";
import "./style/font/font.css";

interface Props {
	editor: EditorState;
	file: FileState;
	prefs: PrefsState;
}

export const Editor = (props: Props): JSX.Element => {
	const { editor, file, prefs } = props;

	const containerRef = useRef<HTMLDivElement>(null);
	const statusRef = useRef<HTMLDivElement>(null);

	useEditorInit({ editor, containerRef });
	useEditorLayout({ editor, containerRef });
	useEditorVim({ editor, prefs, statusRef });
	useEditorFile({ editor, file });
	useEditorTheme({ editor, prefs });

	return (
		<div className={s.container}>
			<div className={s.editor} ref={containerRef} />
			<div className={s.status} ref={statusRef} />
		</div>
	);
};
