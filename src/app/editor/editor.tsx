import { useRef } from "react";
import { PrefsState } from "../prefs/state";
import { useEditorFile } from "./state/file";
// import { useEditorInit } from "./state/init/init";
import { useEditorLength } from "./state/length";
import { useEditorSize } from "./state/size";
import { EditorState } from "./state/state";
// import { useEditorTheme } from "./state/theme/theme";
import { useEditorVim } from "./state/vim";
import { EditorStatus } from "./status/status";
// import "./style/editor.global.css";
import s from "./style/editor.module.css";
// import "./style/font/font.css";

interface Props {
	editor: EditorState;
	prefs: PrefsState;
}

export const Editor = (props: Props): JSX.Element => {
	const { editor, prefs } = props;

	const containerRef = useRef<HTMLDivElement>(null);
	const statusRef = useRef<HTMLDivElement>(null);

	// useEditorInit({ editor, containerRef });
	useEditorLength({ editor, containerRef, prefs });
	// useEditorVim({ editor, prefs, statusRef });
	useEditorFile({ editor });
	// useEditorTheme({ editor, prefs });
	useEditorSize({ editor, prefs });

	return (
		<div className={s.container}>
			<div className={s.editor} ref={containerRef}></div>
			<div className={s.status}>
				<EditorStatus statusRef={statusRef} size={prefs.size} />
			</div>
		</div>
	);
};
