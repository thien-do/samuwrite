import { TippyProps } from "@tippyjs/react";
import { useMemo } from "react";
import { VscSave } from "react-icons/vsc";
import { Button } from "~src/button/button";
import { FileState } from "~src/file/state";
import { MenuItem } from "~src/menu/item/interface";
import { useShortcut } from "~src/shortcut/use-shortcut";
import { SHORTCUTS } from "~src/toolbar/shortcuts";
import { Tooltip } from "~src/tooltip/tooltip";
import { vote } from "~src/utils/vote";
import { Editor } from "../editor/state/state";
import {
	fileSave,
	FileSystemHandle,
	FirstFileSaveOptions,
} from "browser-fs-access";
import { toFileWithHandle } from "~src/utils/file";
import { fileSystem } from "~src/file/system";

interface Props {
	file: FileState;
	editor: Editor;
	singleton: TippyProps["singleton"];
}

const getHandle = async (params: {
	fileHandle: FileState["handle"];
	saveAs: boolean;
}): Promise<FileSystemHandle | null> => {
	const { fileHandle, saveAs } = params;

	// Save existed file
	if (fileHandle !== null && saveAs === false) {
		return fileHandle.handle ?? null;
	}

	return null;
};

const getFileSaveOptions = (params: {
	fileHandle: FileState["handle"];
	saveAs: boolean;
}): FirstFileSaveOptions | undefined => {
	const { fileHandle, saveAs } = params;
	if (!saveAs && fileHandle?.handle) return undefined;
	return {
		fileName: fileHandle?.name ?? "Untitled.md",
		excludeAcceptAllOption: false,
		mimeTypes: fileSystem.optionTypes[0].mimeTypes,
		extensions: fileSystem.optionTypes[0].extensions,
	};
};

const saveFile = async (params: {
	fileHandle: FileState["handle"];
	setFileHandle: FileState["setHandle"];
	setFileDirty: FileState["setDirty"];
	editor: Editor;
	saveAs: boolean;
}): Promise<void> => {
	const { fileHandle, setFileHandle, setFileDirty } = params;
	const { editor, saveAs } = params;

	// Prepare handle and saveOptions
	const handle = await getHandle({ fileHandle, saveAs });
	const saveOptions = getFileSaveOptions({ fileHandle, saveAs });

	// Write
	const text = editor.getValue();
	const blob = new Blob([text], { type: "text/markdown" });
	const newHandle = await fileSave(blob, saveOptions, handle);
	if (newHandle !== null && fileHandle?.handle?.isSameEntry(newHandle)) {
		const newFileHandle = await toFileWithHandle(newHandle);
		setFileHandle(newFileHandle);
	}

	setFileDirty(false);
};

/**
 * Memoized our callbacks so they can be used safely in effects
 */
const useCallbacks = (props: Props) => {
	const editor = props.editor;
	const fileHandle = props.file.handle;
	const setFileHandle = props.file.setHandle;
	const setFileDirty = props.file.setDirty;

	const callbacks = useMemo(() => {
		const params = { fileHandle, setFileDirty, setFileHandle, editor };
		const save = async () => {
			saveFile({ ...params, saveAs: false });
		};
		const saveAs = async () => {
			saveFile({ ...params, saveAs: true });
		};
		const print = () => {
			vote(86);
		};
		return { save, saveAs, print };
	}, [editor, fileHandle, setFileHandle, setFileDirty]);

	return callbacks;
};

export const ToolbarSave = (props: Props): JSX.Element => {
	const callbacks = useCallbacks(props);

	useShortcut({ keys: SHORTCUTS.save, callback: callbacks.save });
	useShortcut({ keys: SHORTCUTS.saveAs, callback: callbacks.saveAs });
	useShortcut({ keys: SHORTCUTS.print, callback: callbacks.print });

	const menu: MenuItem[] = [
		{
			type: "action",
			action: callbacks.print,
			label: "Print…",
			shortcut: SHORTCUTS.print,
		},
		{
			type: "action",
			action: callbacks.saveAs,
			label: "Save as…",
			shortcut: SHORTCUTS.saveAs,
		},
	];

	return (
		<Tooltip content="Save" singleton={props.singleton}>
			<Button
				onClick={callbacks.save}
				Icon={VscSave}
				shortcut={SHORTCUTS.save}
				more={menu}
			/>
		</Tooltip>
	);
};
