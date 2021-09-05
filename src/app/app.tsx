import { useEditor } from "~/src/components/editor/state/state";
import { useFile } from "~/src/components/file/state";
import { Layout } from "~/src/components/layout/layout";
import { Toolbar } from "~/src/components/toolbar/toolbar";
import { usePrefs } from "~src/components/prefs/state";
import { ThemeInject } from "~src/components/theme/inject";
import s from "./app.module.css";
import { AppDrop } from "./drop/drop";
import { useAppDrop } from "./drop/state";
import { AppTitle } from "./title";
import { useToolbarAutohide } from "./toolbar/autohide";

export const App = (): JSX.Element => {
	const editor = useEditor();
	const file = useFile();
	const prefs = usePrefs();

	const toolbar = useToolbarAutohide({ editor });
	const drop = useAppDrop({ file });

	return (
		<div className={s.app} {...drop.handlers}>
			<AppTitle file={file} />
			<ThemeInject theme={prefs.theme} />
			<div
				className={[s.toolbar, toolbar.mute ? s.muted : ""].join(" ")}
				ref={toolbar.ref}
			>
				<Toolbar
					show={toolbar.show}
					editor={editor.value}
					file={file}
					prefs={prefs}
				/>
			</div>
			<div className={s.body}>
				<Layout editor={editor} file={file} prefs={prefs} />
			</div>
			{drop.dragging && <AppDrop />}
		</div>
	);
};
