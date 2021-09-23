import { TippyProps } from "@tippyjs/react";
import { useMemo } from "react";
import { VscFolder } from "react-icons/vsc";
import { Button } from "~src/button/button";
import { FileState } from "~src/file/state";
import { openFile } from "~src/app/utils/open";
import { useShortcut } from "~src/shortcut/use-shortcut";
import { SHORTCUTS } from "~src/toolbar/shortcuts";
import { ERRORS } from "~src/utils/error";
import { vote } from "~src/utils/vote";
import { Editor } from "../editor/state/state";
import { fileSystem } from "../file/system";
import { MenuItem } from "~src/menu/item/interface";
import { Tooltip } from "~src/tooltip/tooltip";

interface Props {
	singleton: TippyProps["singleton"];
	file: FileState;
	editor: Editor;
}

/**
 * Memoized our callbacks so they can be used safely in effects
 */
const useOpenCallbacks = (props: Props) => {
	const editor = props.editor;
	const fileDirty = props.file.dirty;
	const setFileDirty = props.file.setDirty;
	const fileRecent = props.file.recent;
	const setFileHandle = props.file.setHandle;

	const callbacks = useMemo(() => {
		const params = { editor, fileDirty, setFileDirty, setFileHandle };

		const open = async () => {
			const [fileHandle] = await window.showOpenFilePicker({
				multiple: false,
				types: fileSystem.optionTypes,
				excludeAcceptAllOption: false,
			});
			await openFile({ ...params, fileHandle });
		};

		const openNew = async () => {
			await openFile({ ...params, fileHandle: null });
		};

		const openRecent = async () => {
			if (fileRecent === null) throw ERRORS.recentNull;
			await openFile({ ...params, fileHandle: fileRecent });
		};

		return { open, openNew, openRecent };
	}, [editor, fileDirty, setFileDirty, fileRecent, setFileHandle]);

	return callbacks;
};

type Callbacks = ReturnType<typeof useOpenCallbacks>;

const getMoreMenu = (props: Props, callbacks: Callbacks): MenuItem[] => {
	const menu: MenuItem[] = [];
	menu.push({
		type: "action",
		action: callbacks.openNew,
		label: "New file",
		shortcut: SHORTCUTS.openNew,
	});
	if (props.file.recent !== null) {
		menu.push({
			type: "action",
			action: callbacks.openRecent,
			label: `Open "${props.file.recent.name}"`,
			shortcut: SHORTCUTS.openRecent,
		});
	}
	menu.push(
		{ type: "divider" },
		{ type: "action", action: () => vote(84), label: "Connect to GitHub…" },
		{ type: "action", action: () => vote(85), label: "Connect to Dropbox…" }
	);
	return menu;
};

export const ToolbarOpen = (props: Props): JSX.Element => {
	const callbacks: Callbacks = useOpenCallbacks(props);

	useShortcut(SHORTCUTS.open, callbacks.open);
	useShortcut(SHORTCUTS.openNew, callbacks.openNew);
	useShortcut(SHORTCUTS.openRecent, callbacks.openRecent);

	return (
		<Tooltip content="Open…" singleton={props.singleton}>
			<Button
				onClick={callbacks.open}
				Icon={VscFolder}
				shortcut={SHORTCUTS.open}
				more={getMoreMenu(props, callbacks)}
			/>
		</Tooltip>
	);
};
