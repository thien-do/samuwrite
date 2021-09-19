import { TippyProps } from "@tippyjs/react";
import { VscFolder } from "react-icons/vsc";
import { Button } from "~/src/components/button/button";
import { ButtonMoreMenuItem } from "~/src/components/button/more/menu";
import { FileHandle, FileState } from "~/src/components/file/state";
import { openFile } from "~src/app/utils/open";
import { Editor } from "../editor/state/state";
import { fileSystem } from "../file/system";
import { SHORTCUTS } from "~src/components/toolbar/shortcuts";
import { useShortcut } from "~src/components/shortcut/use-shortcut";

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
	shortcut: SHORTCUTS.OPEN_RECENT,
});

const menuNew = (props: Props): ButtonMoreMenuItem => ({
	action: async () => {
		const { editor, file } = props;
		await openFile({ editor, file, handle: null });
	},
	label: "New file",
	shortcut: SHORTCUTS.NEW_FILE,
});

const getMoreMenu = (props: Props): ButtonMoreMenuItem[] => {
	const menu = [];
	menu.push(menuNew(props));
	if (props.file.recent !== null) {
		menu.push(menuRecent(props, props.file.recent));
	}
	return menu;
};

export const ToolbarOpen = (props: Props): JSX.Element => {
	const open = async () => {
		const [handle] = await window.showOpenFilePicker({
			multiple: false,
			types: fileSystem.optionTypes,
			excludeAcceptAllOption: false,
		});
		const { editor, file } = props;
		await openFile({ editor, file, handle });
	};

	useShortcut(SHORTCUTS.OPEN, open);

	return (
		<Button
			onClick={open}
			Icon={VscFolder}
			shortcut={SHORTCUTS.OPEN}
			tooltip="Open…"
			tooltipSingleton={props.singleton}
			more={getMoreMenu(props)}
		/>
	);
};
