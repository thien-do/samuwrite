import { MutableRefObject, useRef } from "react";
import * as monaco from "monaco-editor";

interface Props {
	editorRef: MutableRefObject<monaco.editor.IStandaloneCodeEditor | null>;
	setValue: (value: string) => void;
}

type HandleRef = MutableRefObject<FileSystemFileHandle | null>;

const openFile = async (handleRef: HandleRef, props: Props) => {
	const [handle] = await window.showOpenFilePicker();
	handleRef.current = handle;
	const file = await handle.getFile();
	const text = await file.text();
	props.setValue(text);
};

const saveFile = async (handleRef: HandleRef, props: Props) => {
	const handle = handleRef.current;
	if (handle === null) throw Error("No file openned");
	const writable = await handle.createWritable();
	const editor = props.editorRef.current;
	if (editor === null) throw Error("Editor is not initialized");
	const text = editor.getValue();
	writable.write(text);
	await writable.close();
};

export const Toolbar = (props: Props) => {
	const handleRef = useRef<FileSystemFileHandle | null>(null);
	return (
		<div>
			<button onClick={() => void openFile(handleRef, props)}>Open</button>
			<button onClick={() => void saveFile(handleRef, props)}>Save</button>
		</div>
	);
};
