import { TippyProps } from "@tippyjs/react";
import { get } from "idb-keyval";
import { VscFolder } from "react-icons/vsc";
import { Button } from "../../components/button/button";
import { ButtonMoreMenuItem } from "../../components/button/more/menu";

interface Props {
	setHandle: (handle: FileSystemFileHandle | null) => void;
	singleton: TippyProps["singleton"];
	setDirtyFile: React.Dispatch<React.SetStateAction<boolean>>;
}

const openFile = async (props: Props) => {
	const [handle] = await window.showOpenFilePicker();
	props.setHandle(handle);
	props.setDirtyFile(false);
};

const recentItem = (props: Props): ButtonMoreMenuItem => ({
	action: async () => {
		const handle = await get("handle");
		if (handle) props.setHandle(handle);
	},
	label: "Open last file",
	shortcut: [
		{ type: "command-or-control" },
		{ type: "shift" },
		{ type: "char", value: "O" },
	],
});

const newItem = (_props: Props): ButtonMoreMenuItem => ({
	action: () => window.alert("Coming soon"),
	label: "New file",
	shortcut: [{ type: "command-or-control" }, { type: "char", value: "N" }],
});

export const ToolbarOpen = (props: Props): JSX.Element => (
	<Button
		onClick={() => void openFile(props)}
		Icon={VscFolder}
		shortcut={[{ type: "command-or-control" }, { type: "char", value: "O" }]}
		tooltip="Open…"
		tooltipSingleton={props.singleton}
		more={[recentItem(props), newItem(props)]}
	/>
);
