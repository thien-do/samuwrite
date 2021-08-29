import { useState, useEffect } from "react";
import s from "./app.module.css";
import { Editor as EditorComponent } from "./editor/editor";
import { Editor as EditorType } from "./editor/type";
import { Toolbar } from "./toolbar/toolbar";
import { useAppFile } from "./use-file";
import { useAppToolbar } from "./use-toolbar";
import { Helmet } from "react-helmet";

export const App = () => {
	const [editor, setEditor] = useState<EditorType | null>(null);
	const [isDirty, setDirtyFile] = useState(false);
	const toolbar = useAppToolbar({ editor });
	const file = useAppFile({ editor });

	// Set file as dirty when user changes the editor content
	useEffect(() => {
		if (editor === null) return;
		const dirty = editor.onDidChangeModelContent(() => void setDirtyFile(true));
		return () => dirty.dispose();
	}, [editor]);

	const title =
		file.handle === null
			? "Samuwrite"
			: `${isDirty ? "* " : ""}${file.handle.name} - Samuwrite`;

	return (
		<div className={s.app}>
			<Helmet>
				<title>{title}</title>
			</Helmet>
			<div
				className={[s.toolbar, toolbar.mute ? s.muted : ""].join(" ")}
				ref={toolbar.ref}
			>
				<Toolbar
					show={toolbar.show}
					editor={editor}
					handle={file.handle}
					setHandle={file.setHandle}
					setDirtyFile={setDirtyFile}
				/>
			</div>
			<div className={s.editor}>
				<EditorComponent setEditor={setEditor} />
			</div>
		</div>
	);
};
