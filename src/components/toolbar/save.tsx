import { TippyProps } from "@tippyjs/react";
import { FileHandle, FileState } from "~/src/components/file/state";
import { VscSave } from "react-icons/vsc";
import { Button } from "~/src/components/button/button";
import { ButtonMoreMenuItem } from "~/src/components/button/more/menu";
import { Editor } from "../editor/state/state";
import { fileSystem } from "../file/system";
import { SHORTCUTS } from "~src/components/toolbar/shortcuts";
import { useShortcut } from "~src/components/shortcut/use-shortcut";
import { useCallback } from "react";

interface Props {
	file: FileState;
	editor: Editor;
	singleton: TippyProps["singleton"];
}

const getHandle = async (params: {
	file: FileState;
	saveAs: boolean;
}): Promise<FileHandle> => {
	const { file, saveAs } = params;

	// Save existed file
	if (file.handle !== null && saveAs === false) {
		return file.handle;
	}
	// "Save as" or Save a new file
	const handle = window.showSaveFilePicker({
		suggestedName: "Untitled.md",
		excludeAcceptAllOption: false,
		types: fileSystem.optionTypes,
	});
	return handle;
};

const save = async (params: {
	file: FileState;
	editor: Editor;
	saveAs: boolean;
}): Promise<void> => {
	const { file, editor, saveAs } = params;

	// Prepare handle
	const handle = await getHandle({ file, saveAs });
	if (handle !== file.handle) file.setHandle(handle);

	// Write
	const writable = await handle.createWritable();
	const text = editor.getValue();
	writable.write(text);

	// Done
	file.setDirty(false);
	await writable.close();
};

const saveAs = (props: Props): ButtonMoreMenuItem => {
	const { file, editor } = props;
	return {
		action: () => void save({ file, editor, saveAs: true }),
		label: "Save as…",
		shortcut: SHORTCUTS.saveAs,
	};
};

export const ToolbarSave = (props: Props): JSX.Element => {
	const { file, editor } = props;

	const saveFile = useCallback(
		() => void save({ file, editor, saveAs: false }),
		[file, editor]
	);

	useShortcut(SHORTCUTS.save, saveFile);

	return (
		<Button
			onClick={saveFile}
			Icon={VscSave}
			shortcut={SHORTCUTS.save}
			tooltip="Save"
			tooltipSingleton={props.singleton}
			more={[saveAs(props)]}
		/>
	);
};
