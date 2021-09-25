import {
	fileSave,
	FileSystemHandle as BfsaFileSystemHandle,
} from "browser-fs-access";
import { Editor } from "~src/editor/state/state";
import { FileModel, FileState } from "~src/file/state";
import { filePickerOptions } from "~src/file/system";

interface Params {
	fileModel: FileState["model"];
	setFileModel: FileState["setModel"];
	setFileDirty: FileState["setDirty"];
	editor: Editor;
	saveAs: boolean;
}

const getExistingHandle = (params: Params): BfsaFileSystemHandle | null => {
	if (params.saveAs) return null;
	// New file, or in unsupported browsers
	return params.fileModel?.handle ?? null;
};

/**
 * The most complete function to save the current file. It does all necessary
 * things to save a file. Always use this one unless you have good reason not
 * to.
 */
export const appSaveFile = async (params: Params): Promise<void> => {
	// Write files
	const text = params.editor.getValue();
	const blob = new Blob([text], { type: "text/markdown" });
	const options = { ...filePickerOptions, fileName: "Untitled.md" };
	const handle = getExistingHandle(params);
	const newHandle = await fileSave(blob, options, handle, true);

	// Update file model
	// Don't use "getFileModel" utility to avoid a "read" request
	const name = newHandle?.name ?? "Untitled";
	const newModel: FileModel = new File([text], name, { type: "text/markdown" });
	newModel.handle = newHandle ?? undefined;
	params.setFileModel(newModel);

	params.setFileDirty(false);
};
