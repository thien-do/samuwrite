import { get } from "idb-keyval";
import { Editor } from "../editor/type";
import { getRef } from "../utils/ref";

interface Props {
	editor: Editor | null;
	handle: FileSystemFileHandle | null;
	setHandle: (handle: FileSystemFileHandle | null) => void;
}

const openFile = async (props: Props) => {
	const [handle] = await window.showOpenFilePicker();
	props.setHandle(handle);
};

const reopenFile = async (props: Props) => {
	const handle = await get("handle");
	if (handle) props.setHandle(handle);
};

const saveFile = async (props: Props) => {
	if (props.handle === null) throw Error("Not support save new file yet");
	const writable = await props.handle.createWritable();
	if (props.editor === null) throw Error("Editor is not inited");
	const text = props.editor.getValue();
	writable.write(text);
	await writable.close();
};

export const Toolbar = (props: Props) => {
	return (
		<div>
			<button onClick={() => void reopenFile(props)}>Re-Open</button>
			<button onClick={() => void openFile(props)}>Open</button>
			<button onClick={() => void saveFile(props)}>Save</button>
		</div>
	);
};
