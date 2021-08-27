import { get } from "idb-keyval";
import { DiVim } from "react-icons/di";
import {
	VscBook,
	VscFile,
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
		<div className={s.container}>
			<div className={s.content}>
				<Button
					onClick={() => void openFile(props)}
					Icon={VscFolder}
					shortcut={[
						{ type: "command-or-control" },
						{ type: "char", value: "O" },
					]}
					more={[]}
				/>
				<Button
					onClick={() => void saveFile(props)}
					Icon={VscSave}
					shortcut={[
						{ type: "command-or-control" },
						{ type: "char", value: "S" },
					]}
					more={[]}
				/>
				{/* <div className={s.divider} /> */}
				<Button
					onClick={() => {}}
					Icon={VscBook}
					shortcut={[
						{ type: "command-or-control" },
						{ type: "char", value: "P" },
					]}
					more={[]}
				/>
				<Button
					onClick={() => {}}
					Icon={DiVim}
					shortcut={[
						{ type: "command-or-control" },
						{ type: "char", value: "M" },
					]}
				/>
				<div className={s.grow} />
				<Button
					onClick={() => {}}
					Icon={VscSettingsGear}
					shortcut={[
						{ type: "command-or-control" },
						{ type: "char", value: "," },
					]}
				/>
				<Button
					onClick={() => {}}
					Icon={VscMenu}
					shortcut={[
						{ type: "command-or-control" },
						{ type: "char", value: "/" },
					]}
				/>
			</div>
		</div>
	</div>
);
