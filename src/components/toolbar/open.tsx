import { TippyProps } from "@tippyjs/react";
import { get } from "idb-keyval";
import { VscFolder } from "react-icons/vsc";
import { Button } from "~/src/components/button/button";
import { ButtonMoreMenuItem } from "~/src/components/button/more/menu";
import { FileHandle, FileState } from "~/src/components/file/state";
import { Editor } from "../editor/state/state";
import { openFileInEditor } from "../editor/utils/open";
import { fileSystem } from "../file/system";

interface Props {
	singleton: TippyProps["singleton"];
	file: FileState;
	editor: Editor;
}

const open = async (props: Props, handle: FileHandle | null): Promise<void> => {
	props.file.setHandle(handle);
	props.file.setDirty(false);
	await openFileInEditor({ editor: props.editor, handle });
};

const recentItem = (props: Props): ButtonMoreMenuItem => ({
	action: async () => {
		const handle = await get("handle");
		if (handle === null) return;
		await open(props, handle);
	},
	label: "Open last file",
	shortcut: [
		{ type: "command-or-control" },
		{ type: "shift" },
		{ type: "char", value: "O" },
	],
});

const newItem = (props: Props): ButtonMoreMenuItem => ({
	action: async () => void open(props, null),
	label: "New file",
	shortcut: [{ type: "command-or-control" }, { type: "char", value: "N" }],
});

export const ToolbarOpen = (props: Props): JSX.Element => (
	<Button
		onClick={async () => {
			const [handle] = await window.showOpenFilePicker({
				multiple: false,
				types: fileSystem.optionTypes,
				excludeAcceptAllOption: false,
			});
			await open(props, handle);
		}}
		Icon={VscFolder}
		shortcut={[{ type: "command-or-control" }, { type: "char", value: "O" }]}
		tooltip="Open…"
		tooltipSingleton={props.singleton}
		more={[recentItem(props), newItem(props)]}
	/>
);
