import s from "./app.module.css";
import { AppBody } from "./body/body";
import { useEditor } from "./editor/state/state";
import { Toolbar } from "./toolbar/toolbar";
import { useAppFile } from "./use-file";
import { useLayout } from "./use-layout";
import { useAppToolbar } from "./use-toolbar";

export const App = () => {
	const layout = useLayout();
	const editor = useEditor();
	const toolbar = useAppToolbar({ editor: editor.value });
	const file = useAppFile({ editor: editor.value });

	return (
		<div className={s.app}>
			<div
				className={[s.toolbar, toolbar.mute ? s.muted : ""].join(" ")}
				ref={toolbar.ref}
			>
				<Toolbar
					layout={layout}
					show={toolbar.show}
					editor={editor.value}
					file={file}
				/>
			</div>
			<div className={s.body}>
				<AppBody layout={layout.value} editor={editor} />
			</div>
		</div>
	);
};
