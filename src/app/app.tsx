import { useEffect, useRef, useState } from "react";
import * as monaco from "monaco-editor";
import { Editor as EditorComponent } from "../editor/editor";
import { Toolbar } from "../toolbar/toolbar";
import { Editor as EditorType } from "../editor/type";

export const App = () => {
	const [value, setValue] = useState("");
	const editorRef = useRef<EditorType | null>(null);

	useEffect(() => {
		const editor = editorRef.current;
		if (editor === null) throw Error("Editor is not initialized");
		const model = monaco.editor.createModel(value, "markdown");
		editor.setModel(model);
		return () => {
			model.dispose();
		};
	}, [value]);

	return (
		<div>
			<Toolbar editorRef={editorRef} setValue={setValue} />
			<EditorComponent editorRef={editorRef} />
		</div>
	);
};
