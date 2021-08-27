import Tippy, { useSingleton } from "@tippyjs/react";
import { DiVim } from "react-icons/di";
import { VscBook, VscMenu, VscSave, VscSettingsGear } from "react-icons/vsc";
import { Button } from "../../components/button/button";
import { Tooltip } from "../../components/tooltip/tooltip";
import { Editor } from "../editor/type";
import { ToolbarOpen } from "./open";
import s from "./toolbar.module.css";

interface Props {
	editor: Editor | null;
	handle: FileSystemFileHandle | null;
	setHandle: (handle: FileSystemFileHandle | null) => void;
}

const saveFile = async (props: Props) => {
	if (props.handle === null) throw Error("Not support save new file yet");
	const writable = await props.handle.createWritable();
	if (props.editor === null) throw Error("Editor is not inited");
	const text = props.editor.getValue();
	writable.write(text);
	await writable.close();
};

export const Toolbar = (props: Props) => {
	const [source, target] = useSingleton();
	return (
		<div className={s.toolbar}>
			<Tippy singleton={source} delay={500} />
			<ToolbarOpen singleton={target} setHandle={props.setHandle} />
			<Tooltip singleton={target} content="Open">
				<Button
					onClick={() => void saveFile(props)}
					Icon={VscSave}
					shortcut={[
						{ type: "command-or-control" },
						{ type: "char", value: "S" },
					]}
					more={[]}
				/>
			</Tooltip>
			<Button
				onClick={() => window.alert("Coming soon")}
				Icon={VscBook}
				shortcut={[
					{ type: "command-or-control" },
					{ type: "char", value: "P" },
				]}
				more={[]}
			/>
			<Button
				onClick={() => window.alert("Coming soon")}
				Icon={DiVim}
				shortcut={[
					{ type: "command-or-control" },
					{ type: "char", value: "M" },
				]}
			/>
			<div className={s.grow} />
			<Button
				onClick={() => window.alert("Coming soon!")}
				Icon={VscSettingsGear}
				shortcut={[
					{ type: "command-or-control" },
					{ type: "char", value: "," },
				]}
			/>
			<Button
				onClick={() => window.alert("Coming soon!")}
				Icon={VscMenu}
				shortcut={[
					{ type: "command-or-control" },
					{ type: "char", value: "/" },
				]}
			/>
		</div>
	);
};
