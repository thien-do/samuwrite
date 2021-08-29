import { Dispatch, SetStateAction } from "react";
import { Editor as EditorComponent } from "../editor/editor";
import { Editor as EditorType, EditorState } from "../editor/state/state";
import { Layout } from "../use-layout";
import s from "./body.module.css";

interface Props {
	layout: Layout;
	editor: EditorState;
}

const layoutClass: Record<Layout, string> = {
	editor: s.editorView,
	preview: s.previewView,
	split: s.splitView,
};

export const AppBody = (props: Props): JSX.Element => (
	<div className={[s.body, layoutClass[props.layout]].join(" ")}>
		{/* Always render Editor to avoid losing content state */}
		<div className={s.editor}>
			<EditorComponent editor={props.editor} />
		</div>
		{/* Only render Preview when necessary to avoid re-calculating the HTML */}
		{props.layout !== "editor" && <div className={s.preview}>Preview</div>}
	</div>
);
