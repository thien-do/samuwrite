import { TippyProps } from "@tippyjs/react";
import { VscSave } from "react-icons/vsc";
import { Button } from "../../components/button/button";
import { Editor } from "../editor/type";

interface Props {
	handle: FileSystemFileHandle | null;
	editor: Editor | null;
	singleton: TippyProps["singleton"];
}

const saveFile = async (props: Props) => {
	if (props.handle === null) throw Error("Not support save new file yet");
	const writable = await props.handle.createWritable();
	if (props.editor === null) throw Error("Editor is not inited");
	const text = props.editor.getValue();
	writable.write(text);
	await writable.close();
};

export const ToolbarSave = (props: Props): JSX.Element => (
	<Button
		onClick={() => void saveFile(props)}
		Icon={VscSave}
		shortcut={[{ type: "command-or-control" }, { type: "char", value: "S" }]}
		tooltip="Save"
		tooltipSingleton={props.singleton}
		more={{
			items: [],
			tooltip: "More save options",
		}}
	/>
);
