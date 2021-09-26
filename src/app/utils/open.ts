import * as monaco from "monaco-editor";
import { Editor } from "~src/editor/state/state";
import { FileState } from "~src/file/state";
import { ERRORS } from "~src/utils/error";

interface Params {
	editor: Editor | null;
	/**
	 * The current file dirty
	 */
	fileDirty: FileState["dirty"];
	setFileDirty: FileState["setDirty"];
	/**
	 * The File to open in the editor. Note that this function does not specify
	 * a way to "choose" a file (e.g. open the file picker). It only "read" the
	 * file content to the editor.
	 *
	 * Note that this is a new file to be opened, not the current file in the
	 * app's state
	 */
	fileModel: FileState["model"];
	/**
	 * Set the current file in the app state
	 */
	setFileModel: FileState["setModel"];
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
	const { editor, fileModel } = params;
	if (editor === null) throw ERRORS.editorNull;
	editor.getModel()?.dispose();
	const text = fileModel === null ? "" : await fileModel.text();
	const model = monaco.editor.createModel(text, "markdown");
	editor.setModel(model);
	setTimeout(() => editor.focus(), 0);
};

/**
 * The safest function to open a file. It does all necessary things to open a
 * file. Always use this one unless you have good reason not to.
 */
export const appOpenFile = async (params: Params): Promise<void> => {
	// Warn if there are unsaved changes
	if (params.fileDirty === true) {
		const confirmed = await confirmUnsaved();
		if (confirmed === false) return;
	}

	// Set the state
	params.setFileModel(params.fileModel);
	params.setFileDirty(false);

	// Update editor
	await updateEditor(params);
};
