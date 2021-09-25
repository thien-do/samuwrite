import { TippyProps } from "@tippyjs/react";
import { useMemo } from "react";
import { VscFolder } from "react-icons/vsc";
import { openFile } from "~src/app/utils/open";
import { Button } from "~src/button/button";
import { FileState } from "~src/file/state";
import { MenuItem } from "~src/menu/item/interface";
import { useShortcut } from "~src/shortcut/use-shortcut";
import { SHORTCUTS } from "~src/toolbar/shortcuts";
import { Tooltip } from "~src/tooltip/tooltip";
import { ERRORS } from "~src/utils/error";
import { vote } from "~src/utils/vote";
import { Editor } from "../editor/state/state";
import { fileSystem } from "../file/system";
import { fileOpen, FileWithHandle } from "browser-fs-access";
import { toFileWithHandle } from "~src/utils/file";

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
			const fileHandle = await fileOpen(fileSystem.optionTypes);
			if (!fileHandle) {
				throw Error("No file is selected");
			}
			await openFile({
				...params,
				// fileSystem.optionTypes disables multiple selection
				// so that, we can make sure than fileHandle is not an array
				fileHandle: fileHandle as FileWithHandle,
			});
		};

		const openNew = async () => {
			await openFile({ ...params, fileHandle: null });
		};

		const openRecent = async () => {
			if (fileRecent === null) throw ERRORS.recentNull;
			const handle = await toFileWithHandle(fileRecent);
			await openFile({ ...params, fileHandle: handle });
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

	useShortcut({ keys: SHORTCUTS.open, callback: callbacks.open });
	useShortcut({ keys: SHORTCUTS.openNew, callback: callbacks.openNew });
	useShortcut({ keys: SHORTCUTS.openRecent, callback: callbacks.openRecent });

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
