import { useEditor } from "~/src/components/editor/state/state";
import { useFile } from "~/src/components/file/state";
import { Layout } from "~/src/components/layout/layout";
import { useLayout } from "~/src/components/layout/state";
import { Toolbar } from "~/src/components/toolbar/toolbar";
import { Helmet } from "react-helmet";
import s from "./app.module.css";
import { useFileDirty } from "./state/file-dirty";
import { useFileLoad } from "./state/file-load";
import { useToolbarAutohide } from "./state/toolbar-autohide";

export const App = () => {
	const layout = useLayout();
	const editor = useEditor();
	const file = useFile();

	useFileDirty({ editor: editor.value, setFileDirty: file.setDirty });
	useFileLoad({ editor: editor.value, fileHandle: file.handle });
	const toolbar = useToolbarAutohide({ editor: editor.value });

	const title =
		file.handle === null
			? "Samuwrite"
			: `${file.dirty ? "* " : ""}${file.handle.name} - Samuwrite`;

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
					file={file}
				/>
			</div>
			<div className={s.body}>
				<Layout layout={layout.value} editor={editor} />
			</div>
		</div>
	);
};
