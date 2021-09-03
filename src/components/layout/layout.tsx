import { Editor as EditorComponent } from "../editor/editor";
import { EditorState } from "../editor/state/state";
import { FileState } from "../file/state";
import { PrefsState } from "../prefs/state";
import { Preview } from "../preview/preview";
import s from "./layout.module.css";
import { Layout as LayoutType } from "./state";

interface Props {
	editor: EditorState;
	file: FileState;
	prefs: PrefsState;
	layout: LayoutType;
}

const layoutClass: Record<LayoutType, string> = {
	editor: s.editorView,
	preview: s.previewView,
	split: s.splitView,
};

export const Layout = (props: Props): JSX.Element => (
	<div className={[s.layout, layoutClass[props.layout]].join(" ")}>
		{/* Always render Editor to avoid losing content state */}
		<div className={s.editor}>
			<EditorComponent
				file={props.file}
				prefs={props.prefs}
				editor={props.editor}
			/>
		</div>
		{/* Only render Preview when necessary to avoid re-calculating the HTML */}
		{props.layout !== "editor" && (
			<div className={s.preview}>
				<Preview editor={props.editor.value} />
			</div>
		)}
	</div>
);
