import { TippyProps } from "@tippyjs/react";
import { Button } from "~/src/components/button/button";
import { ButtonMoreMenuItem } from "~/src/components/button/more/menu";
import { FileHandle, FileState } from "~/src/components/file/state";
import { get } from "idb-keyval";
import { VscFolder } from "react-icons/vsc";

interface Props {
	singleton: TippyProps["singleton"];
	file: FileState;
}

const setFile = async (props: Props, handle: FileHandle): Promise<void> => {
	props.file.setFile(handle);
};

const openFile = async (props: Props): Promise<void> => {
	const [handle] = await window.showOpenFilePicker();
	await setFile(props, handle);
};

const recentItem = (props: Props): ButtonMoreMenuItem => ({
	action: async () => {
		const handle = await get("handle");
		if (handle) setFile(props, handle);
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
