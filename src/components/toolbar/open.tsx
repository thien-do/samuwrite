import { TippyProps } from "@tippyjs/react";
import { useMemo } from "react";
import { VscFolder } from "react-icons/vsc";
import { Button } from "~/src/components/button/button";
import { ButtonMoreItem } from "~/src/components/button/more/menu";
import { FileState } from "~/src/components/file/state";
import { openFile } from "~src/app/utils/open";
import { useShortcut } from "~src/components/shortcut/use-shortcut";
import { SHORTCUTS } from "~src/components/toolbar/shortcuts";
import { ERRORS } from "~src/utils/error";
import { vote } from "~src/utils/vote";
import { Editor } from "../editor/state/state";
import { fileSystem } from "../file/system";

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

const getMoreMenu = (props: Props, callbacks: Callbacks): ButtonMoreItem[] => {
	const menu: ButtonMoreItem[] = [];
	menu.push({
		action: callbacks.openNew,
		label: "New file",
		shortcut: SHORTCUTS.openNew,
	});
	if (props.file.recent !== null) {
		menu.push({
			action: callbacks.openRecent,
			label: `Open "${props.file.recent.name}"`,
			shortcut: SHORTCUTS.openRecent,
		});
	}
	menu.push(
		"divider",
		{ action: () => vote(84), label: "Connect to GitHub…" },
		{ action: () => vote(85), label: "Connect to Dropbox…" }
	);
	return menu;
};

export const ToolbarOpen = (props: Props): JSX.Element => {
	const callbacks: Callbacks = useOpenCallbacks(props);

	useShortcut(SHORTCUTS.open, callbacks.open);
	useShortcut(SHORTCUTS.openNew, callbacks.openNew);
	useShortcut(SHORTCUTS.openRecent, callbacks.openRecent);

	return (
		<Button
			onClick={callbacks.open}
			Icon={VscFolder}
			shortcut={SHORTCUTS.open}
			tooltip="Open…"
			tooltipSingleton={props.singleton}
			more={getMoreMenu(props, callbacks)}
		/>
	);
};
