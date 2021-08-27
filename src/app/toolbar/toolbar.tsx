import { get } from "idb-keyval";
import { Editor } from "../editor/type";
import s from "./toolbar.module.css";
import { RiFolderOpenLine } from "react-icons/ri";
import { Button } from "../../components/button/button";

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

export const Toolbar = (props: Props) => (
	<div className={s.toolbar}>
		<div className={s.content}>
			<button onClick={() => void reopenFile(props)}>Re-Open</button>
			<Button
				onClick={() => void openFile(props)}
				Icon={RiFolderOpenLine}
				shortcut={["command-or-control", "O"]}
			/>
			<button onClick={() => void saveFile(props)}>Save</button>
		</div>
	</div>
);
