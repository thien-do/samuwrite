import * as monaco from "monaco-editor";
import { Editor } from "~src/components/editor/state/state";
import { FileHandle, FileState } from "~src/components/file/state";
import { fileSystem } from "~src/components/file/system";
import { ERRORS } from "~src/utils/error";

interface Params {
	editor: Editor | null;
	/**
	 * The current file dirty
	 */
	fileDirty: FileState["dirty"];
	setFileDirty: FileState["setDirty"];
	/**
	 * The handle to open a file. Note that "openFile" does not specify a way
	 * to obtain a handle (e.g. open the file picker). It only "read" the file
	 * content from a handle.
	 *
	 * Note that this is a new handle to be opened, not the handle of the
	 * current file. This is why the type is intentionally explicit, and not
	 * `FileState["handle"]`.
	 */
	fileHandle: FileHandle | null;
	setFileHandle: FileState["setHandle"];
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
	const { editor, fileHandle } = params;
	if (editor === null) throw ERRORS.editorNull;
	editor.getModel()?.dispose();
	const text = fileHandle === null ? "" : await fileSystem.safeRead(fileHandle);
	const model = monaco.editor.createModel(text, "markdown");
	editor.setModel(model);
};

/**
 * The safest function to open a file. It does all necessary things to open a
 * file. Always use this one unless you have good reason not to.
 */
export const openFile = async (params: Params): Promise<void> => {
	// Warn if there are unsaved changes
	if (params.fileDirty === true) {
		const confirmed = await confirmUnsaved();
		if (confirmed === false) return;
	}

	// Set the state
	params.setFileHandle(params.fileHandle);
	params.setFileDirty(false);

	// Update editor
	await updateEditor(params);
};
