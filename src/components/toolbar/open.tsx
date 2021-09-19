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
import { useCallback } from "react";

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
	shortcut: SHORTCUTS.recent,
});

const menuNew = (props: Props): ButtonMoreMenuItem => ({
	action: async () => {
		const { editor, file } = props;
		await openFile({ editor, file, handle: null });
	},
	label: "New file",
	shortcut: SHORTCUTS.new,
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
	const open = useCallback(async () => {
		const [handle] = await window.showOpenFilePicker({
			multiple: false,
			types: fileSystem.optionTypes,
			excludeAcceptAllOption: false,
		});
		const { editor, file } = props;
		await openFile({ editor, file, handle });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		props.file.dirty,
		props.file.setDirty,
		props.file.setHandle,
		props.editor.getModel,
		props.editor.setModel,
	]);

	useShortcut(SHORTCUTS.open, open);

	return (
		<Button
			onClick={open}
			Icon={VscFolder}
			shortcut={SHORTCUTS.open}
			tooltip="Open…"
			tooltipSingleton={props.singleton}
			more={getMoreMenu(props)}
		/>
	);
};
