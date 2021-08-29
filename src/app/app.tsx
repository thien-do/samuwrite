import { useState } from "react";
import s from "./app.module.css";
import { Editor as EditorComponent } from "./editor/editor";
import { Editor as EditorType } from "./editor/type";
import { Toolbar } from "./toolbar/toolbar";
import { useAppFile } from "./use-file";
import { useAppToolbar } from "./use-toolbar";

export const App = () => {
	const [editor, setEditor] = useState<EditorType | null>(null);
	const toolbar = useAppToolbar({ editor });
	const file = useAppFile({ editor });

	return (
		<div className={s.app}>
			<div
				className={[s.toolbar, toolbar.mute ? s.muted : ""].join(" ")}
				ref={toolbar.ref}
			>
				<Toolbar
					show={toolbar.show}
					editor={editor}
					handle={file.handle}
					setHandle={file.setHandle}
				/>
			</div>
			<div className={s.editor}>
				<EditorComponent setEditor={setEditor} />
			</div>
		</div>
	);
};
