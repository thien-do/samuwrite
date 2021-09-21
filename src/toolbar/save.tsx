import { TippyProps } from "@tippyjs/react";
import { useMemo } from "react";
import { VscSave } from "react-icons/vsc";
import { Button } from "~src/button/button";
import { FileHandle, FileState } from "~src/file/state";
import { useShortcut } from "~src/shortcut/use-shortcut";
import { SHORTCUTS } from "~src/toolbar/shortcuts";
import { Editor } from "../editor/state/state";
import { fileSystem } from "../file/system";

interface Props {
	file: FileState;
	editor: Editor;
	singleton: TippyProps["singleton"];
}

const getHandle = async (params: {
	fileHandle: FileState["handle"];
	saveAs: boolean;
}): Promise<FileHandle> => {
	const { fileHandle, saveAs } = params;

	// Save existed file
	if (fileHandle !== null && saveAs === false) {
		return fileHandle;
	}

	// "Save as" or Save a new file
	const handle = window.showSaveFilePicker({
		suggestedName: "Untitled.md",
		excludeAcceptAllOption: false,
		types: fileSystem.optionTypes,
	});

	return handle;
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

	// Prepare handle
	const handle = await getHandle({ fileHandle, saveAs });
	if (handle !== fileHandle) setFileHandle(handle);

	// Write
	const writable = await handle.createWritable();
	const text = editor.getValue();
	writable.write(text);

	// Done
	setFileDirty(false);
	await writable.close();
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
		return { save, saveAs };
	}, [editor, fileHandle, setFileHandle, setFileDirty]);

	return callbacks;
};

export const ToolbarSave = (props: Props): JSX.Element => {
	const callbacks = useCallbacks(props);

	useShortcut(SHORTCUTS.save, callbacks.save);
	useShortcut(SHORTCUTS.saveAs, callbacks.saveAs);

	return (
		<Button
			onClick={callbacks.save}
			Icon={VscSave}
			shortcut={SHORTCUTS.save}
			tooltip="Save"
			tooltipSingleton={props.singleton}
			more={[
				{
					type: "action",
					action: callbacks.saveAs,
					label: "Save as…",
					shortcut: SHORTCUTS.saveAs,
				},
			]}
		/>
	);
};
