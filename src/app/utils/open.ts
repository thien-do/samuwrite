import * as monaco from "monaco-editor";
import { Editor } from "~src/components/editor/state/state";
import { FileHandle, FileState } from "~src/components/file/state";
import { fileSystem } from "~src/components/file/system";
import { ERRORS } from "~src/utils/error";

interface Params {
	editor: Editor | null;
	file: FileState;
	handle: FileHandle | null;
}

const confirmUnsaved = async (): Promise<boolean> => {
	const confirmed = window.confirm(
		[
			"There are unsaved changes that will be lost if you continue.",
			"Are you sure you want to continue?",
		].join("\n")
	);
	return confirmed;
};

const updateEditor = async (params: Params): Promise<void> => {
	const { editor, handle } = params;
	if (editor === null) throw ERRORS.editorNull;
	editor.getModel()?.dispose();
	const text = handle === null ? "" : await fileSystem.safeRead(handle);
	const model = monaco.editor.createModel(text, "markdown");
	editor.setModel(model);
};

/**
 * The safest function to open a file. It does all necessary things to open a
 * file. Always use this one unless you have good reason not to.
 */
export const openFile = async (params: Params): Promise<void> => {
	// Warn if there are unsaved changes
	if (params.file.dirty === true) {
		const confirmed = await confirmUnsaved();
		if (confirmed === false) return;
	}

	// Set the state
	params.file.setHandle(params.handle);
	params.file.setDirty(false);

	// Update editor
	await updateEditor(params);
};
