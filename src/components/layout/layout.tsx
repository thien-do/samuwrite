import { Editor as EditorComponent } from "../editor/editor";
import { EditorState } from "../editor/state/state";
import { FileState } from "../file/state";
import { PrefsState } from "../prefs/state";
import { Preview } from "../preview/preview";
import s from "./layout.module.css";

interface Props {
	editor: EditorState;
	file: FileState;
	prefs: PrefsState;
}

const getLayoutClass = (props: Props): string => {
	const { previewVisible, previewSplit } = props.prefs;
	if (previewVisible === false) return s.editorView;
	return previewSplit ? s.splitView : s.previewView;
};

export const Layout = (props: Props): JSX.Element => (
	<div className={[s.layout, getLayoutClass(props)].join(" ")}>
		{/* Always render Editor to avoid losing content state */}
		<div className={s.editor}>
			<EditorComponent
				file={props.file}
				prefs={props.prefs}
				editor={props.editor}
			/>
		</div>
		{/* Only render Preview when necessary to avoid re-calculating the HTML */}
		{props.prefs.previewVisible && (
			<div className={s.preview}>
				<Preview editor={props.editor.value} prefs={props.prefs} />
			</div>
		)}
	</div>
);
