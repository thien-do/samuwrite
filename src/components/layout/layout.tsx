import { RefObject } from "react";
import { Editor as EditorComponent } from "../editor/editor";
import { EditorState } from "../editor/state/state";
import s from "./layout.module.css";
import { Layout as LayoutType } from "./state";

interface Props {
	layout: LayoutType;
	editor: EditorState;
	statusRef: RefObject<HTMLDivElement>;
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
			<EditorComponent editor={props.editor} statusRef={props.statusRef} />
		</div>
		{/* Only render Preview when necessary to avoid re-calculating the HTML */}
		{props.layout !== "editor" && <div className={s.preview}>Preview</div>}
	</div>
);
