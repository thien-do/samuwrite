import { useEffect, useRef, useState } from "react";
import * as monaco from "monaco-editor";
import { Editor } from "../editor/editor";
import { Toolbar } from "../toolbar/toolbar";

export const App = () => {
	const [value, setValue] = useState("");
	const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

	useEffect(() => {
		const editor = editorRef.current;
		if (editor === null) throw Error("Editor is not initialized");
		const model = monaco.editor.createModel(value, "markdown");
		editor.setModel(model);
	}, [value]);

	return (
		<div>
			<Toolbar setValue={setValue} />
			<Editor editorRef={editorRef} />
		</div>
	);
};
