import { useEditor } from "~src/editor/state/state";
import { useFile } from "~src/file/state";
import { Layout } from "~src/layout/layout";
import { Toolbar } from "~src/toolbar/toolbar";
import { usePrefs } from "~src/prefs/state";
import { ThemeInject } from "~src/theme/inject";
import s from "./app.module.css";
import { AppDrop } from "./drop/drop";
import { useAppDrop } from "./drop/state";
import { AppTitle } from "./title";
import { useToolbarAutohide } from "./toolbar/autohide";
import { useUnload } from "./unload/unload";

export const App = (): JSX.Element => {
	const editor = useEditor();
	const file = useFile();
	const prefs = usePrefs();

	const toolbar = useToolbarAutohide({ editor });
	const drop = useAppDrop({ editor, file });

	useUnload((e) => {
		if (!file.dirty) return;
		e.preventDefault();
		const exit = confirm(
			"Your changes will be lost if you don't save them. Do you want to leave?"
		);
		if (exit) window.close();
	});

	return (
		<div className={s.app} {...drop.handlers}>
			<AppTitle file={file} />
			<ThemeInject theme={prefs.theme} />
			{/* It is actually ok to render Toolbar when editor is null (not
				initialized). However, most actions in Toolbar depends on the
				editor so it's simpler to just check for null here once */}
			{editor.value !== null && (
				<div
					className={[s.toolbar, toolbar.mute ? s.muted : ""].join(" ")}
					{...toolbar.handlers}
				>
					<Toolbar
						show={toolbar.show}
						editor={editor.value}
						file={file}
						prefs={prefs}
					/>
				</div>
			)}
			<div className={s.body}>
				<Layout editor={editor} file={file} prefs={prefs} />
			</div>
			{drop.dragging && <AppDrop />}
		</div>
	);
};
