import { get } from "idb-keyval";
import { DiVim } from "react-icons/di";
import {
	VscBook,
	VscFolder,
	VscMenu,
	VscSave,
	VscSettingsGear,
} from "react-icons/vsc";
import { Button } from "../../components/button/button";
import { Editor } from "../editor/type";
import s from "./toolbar.module.css";

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
		<Button
			onClick={() => void openFile(props)}
			Icon={VscFolder}
			shortcut={[{ type: "command-or-control" }, { type: "char", value: "O" }]}
			more={[
				{
					action: () => window.alert("Coming soon"),
					label: "New file",
					shortcut: [
						{ type: "command-or-control" },
						{ type: "char", value: "N" },
					],
				},
				{
					action: () => reopenFile(props),
					label: "Open last file",
					shortcut: [
						{ type: "command-or-control" },
						{ type: "shift" },
						{ type: "char", value: "O" },
					],
				},
			]}
		/>
		<Button
			onClick={() => void saveFile(props)}
			Icon={VscSave}
			shortcut={[{ type: "command-or-control" }, { type: "char", value: "S" }]}
			more={[]}
		/>
		<Button
			onClick={() => window.alert("Coming soon")}
			Icon={VscBook}
			shortcut={[{ type: "command-or-control" }, { type: "char", value: "P" }]}
			more={[]}
		/>
		<Button
			onClick={() => window.alert("Coming soon")}
			Icon={DiVim}
			shortcut={[{ type: "command-or-control" }, { type: "char", value: "M" }]}
		/>
		<div className={s.grow} />
		<Button
			onClick={() => window.alert("Coming soon!")}
			Icon={VscSettingsGear}
			shortcut={[{ type: "command-or-control" }, { type: "char", value: "," }]}
		/>
		<Button
			onClick={() => window.alert("Coming soon!")}
			Icon={VscMenu}
			shortcut={[{ type: "command-or-control" }, { type: "char", value: "/" }]}
		/>
	</div>
);
