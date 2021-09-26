import { TippyProps } from "@tippyjs/react";
import { fileOpen } from "browser-fs-access";
import { useMemo } from "react";
import { VscFolder } from "react-icons/vsc";
import { appOpenFile } from "~src/app/utils/open";
import { Button } from "~src/button/button";
import { FileState } from "~src/file/state";
import { MenuItem } from "~src/menu/item/interface";
import { useShortcut } from "~src/shortcut/use-shortcut";
import { SHORTCUTS } from "~src/toolbar/shortcuts";
import { Tooltip } from "~src/tooltip/tooltip";
import { ERRORS } from "~src/utils/error";
import { vote } from "~src/utils/vote";
import { Editor } from "../editor/state/state";
import { filePickerOptions, getFileModel } from "../file/system";

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
	const setFileModel = props.file.setModel;

	const callbacks = useMemo(() => {
		const params = { editor, fileDirty, setFileDirty, setFileModel };

		const open = async () => {
			const fileModel = await fileOpen({
				multiple: false,
				...filePickerOptions,
			});
			await appOpenFile({ ...params, fileModel });
		};

		const openNew = async () => {
			await appOpenFile({ ...params, fileModel: null });
		};

		const openRecent = async () => {
			if (fileRecent === null) throw ERRORS.recentNull;
			const fileModel = await getFileModel(fileRecent);
			await appOpenFile({ ...params, fileModel });
		};

		return { open, openNew, openRecent };
	}, [editor, fileDirty, setFileDirty, fileRecent, setFileModel]);

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
