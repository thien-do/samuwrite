import { TippyProps } from "@tippyjs/react";
import { FileHandle, FileState } from "~/src/components/file/state";
import { VscSave } from "react-icons/vsc";
import { Button } from "~/src/components/button/button";
import { ButtonMoreMenuItem } from "~/src/components/button/more/menu";
import { Editor } from "../editor/state/state";
import { fileSystem } from "../file/system";

interface Props {
	file: FileState;
	editor: Editor;
	singleton: TippyProps["singleton"];
}

interface SaveParams {
	props: Props;
	saveAs: boolean;
}

const getHandle = async (params: SaveParams): Promise<FileHandle> => {
	const { props, saveAs } = params;

	// Save existed file
	if (props.file.handle !== null && saveAs === false) {
		return props.file.handle;
	}
	// "Save as" or Save a new file
	const handle = window.showSaveFilePicker({
		suggestedName: "Untitled.md",
		excludeAcceptAllOption: false,
		types: fileSystem.optionTypes,
	});
	return handle;
};

const save = async (params: SaveParams): Promise<void> => {
	const { props, saveAs } = params;

	// Prepare handle
	const handle = await getHandle({ props, saveAs });
	if (handle !== props.file.handle) props.file.setHandle(handle);

	// Write
	const writable = await handle.createWritable();
	const text = props.editor.getValue();
	writable.write(text);

	// Done
	props.file.setDirty(false);
	await writable.close();
};

const saveAs = (props: Props): ButtonMoreMenuItem => ({
	action: () => void save({ props, saveAs: true }),
	label: "Save as…",
	shortcut: [
		{ type: "command-or-control" },
		{ type: "shift" },
		{ type: "char", value: "S" },
	],
});

export const ToolbarSave = (props: Props): JSX.Element => (
	<Button
		onClick={() => void save({ props, saveAs: false })}
		Icon={VscSave}
		shortcut={[{ type: "command-or-control" }, { type: "char", value: "S" }]}
		tooltip="Save"
		tooltipSingleton={props.singleton}
		more={[saveAs(props)]}
	/>
);
