import { useEditor } from "~/src/components/editor/state/state";
import { useFile } from "~/src/components/file/state";
import { Layout } from "~/src/components/layout/layout";
import { useLayout } from "~/src/components/layout/state";
import { Toolbar } from "~/src/components/toolbar/toolbar";
import { usePrefs } from "~src/components/prefs/state";
import s from "./app.module.css";
import { AppDrop } from "./drop/drop";
import { useAppDrop } from "./drop/state";
import { AppTitle } from "./title";
import { useToolbarAutohide } from "./toolbar/autohide";

export const App = (): JSX.Element => {
	const layout = useLayout();
	const editor = useEditor();
	const file = useFile();
	const prefs = usePrefs();

	const toolbar = useToolbarAutohide({ editor });
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
				<Layout
					layout={layout.value}
					editor={editor}
					file={file}
					prefs={prefs}
				/>
			</div>
			{drop.dragging && <AppDrop />}
		</div>
	);
};
