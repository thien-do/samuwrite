import { TippyProps } from "@tippyjs/react";
import { VscFolder } from "react-icons/vsc";
import { Button } from "~/src/components/button/button";
import { ButtonMoreMenuItem } from "~/src/components/button/more/menu";
import { FileHandle, FileState } from "~/src/components/file/state";
import { openFile } from "~src/app/utils/open";
import { Editor } from "../editor/state/state";
import { fileSystem } from "../file/system";

interface Props {
	singleton: TippyProps["singleton"];
	file: FileState;
	editor: Editor;
}

const menuRecent = (props: Props, recent: FileHandle): ButtonMoreMenuItem => ({
	action: async () => {
		const { editor, file } = props;
		await openFile({ editor, file, handle: recent });
	},
	label: `Open "${recent.name}"`,
	shortcut: [
		{ type: "command-or-control" },
		{ type: "shift" },
		{ type: "char", value: "O" },
	],
});

const menuNew = (props: Props): ButtonMoreMenuItem => ({
	action: async () => {
		const { editor, file } = props;
		await openFile({ editor, file, handle: null });
	},
	label: "New file",
	shortcut: [{ type: "command-or-control" }, { type: "char", value: "N" }],
});

const getMoreMenu = (props: Props): ButtonMoreMenuItem[] => {
	const menu = [];
	menu.push(menuNew(props));
	if (props.file.recent !== null) {
		menu.push(menuRecent(props, props.file.recent));
	}
	return menu;
};

export const ToolbarOpen = (props: Props): JSX.Element => (
	<Button
		onClick={async () => {
			const [handle] = await window.showOpenFilePicker({
				multiple: false,
				types: fileSystem.optionTypes,
				excludeAcceptAllOption: false,
			});
			const { editor, file } = props;
			await openFile({ editor, file, handle });
		}}
		Icon={VscFolder}
		shortcut={[{ type: "command-or-control" }, { type: "char", value: "O" }]}
		tooltip="Open…"
		tooltipSingleton={props.singleton}
		more={getMoreMenu(props)}
	/>
);
