import { useState, useEffect } from "react";
import s from "./app.module.css";
import { AppBody } from "./body/body";
import { useEditor } from "./editor/state/state";
import { Toolbar } from "./toolbar/toolbar";
import { useAppFile } from "./use-file";
import { useLayout } from "./use-layout";
import { useAppToolbar } from "./use-toolbar";
import { Helmet } from "react-helmet";

export const App = () => {
	const [isDirty, setDirtyFile] = useState(false);
	const layout = useLayout();
	const editor = useEditor();
	const toolbar = useAppToolbar({ editor: editor.value });
	const file = useAppFile({ editor: editor.value });

	// Set file as dirty when user changes the editor content
	useEffect(() => {
		if (editor.value === null) return;
		const dirty = editor.value.onDidChangeModelContent(
			() => void setDirtyFile(true)
		);
		return () => dirty.dispose();
	}, [editor.value]);

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
					layout={layout}
					show={toolbar.show}
					editor={editor.value}
					setDirtyFile={setDirtyFile}
					file={file}
				/>
			</div>
			<div className={s.body}>
				<AppBody layout={layout.value} editor={editor} />
			</div>
		</div>
	);
};
