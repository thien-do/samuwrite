import { useEditor } from "~/src/components/editor/state/state";
import { useFile } from "~/src/components/file/state";
import { Layout } from "~/src/components/layout/layout";
import { useLayout } from "~/src/components/layout/state";
import { Toolbar } from "~/src/components/toolbar/toolbar";
import { usePrefs } from "~src/components/prefs/state";
import s from "./app.module.css";
import { AppDrop } from "./drop/drop";
import { useAppDrop } from "./drop/state";
import { useEditorTheme } from "./state/editor-theme";
import { useFileDirty } from "./state/file-dirty";
import { useFileLoad } from "./state/file-load";
import { useToolbarAutohide } from "./state/toolbar-autohide";
import { AppTitle } from "./title";

export const App = (): JSX.Element => {
	const layout = useLayout();
	const editor = useEditor();
	const file = useFile();
	const prefs = usePrefs();

	useFileDirty({ editor, file });
	useFileLoad({ editor, file });
	const toolbar = useToolbarAutohide({ editor });
	useEditorTheme({ editor, prefs });
	const drop = useAppDrop({ file });

	return (
		<div className={s.app} {...drop.handlers}>
			<AppTitle file={file} />
			<div
				className={[s.toolbar, toolbar.mute ? s.muted : ""].join(" ")}
				ref={toolbar.ref}
			>
				<Toolbar
					layout={layout}
					show={toolbar.show}
					editor={editor.value}
					file={file}
					prefs={prefs}
				/>
			</div>
			<div className={s.body}>
				<Layout layout={layout.value} editor={editor} />
			</div>
			{drop.dragging && <AppDrop />}
		</div>
	);
};
