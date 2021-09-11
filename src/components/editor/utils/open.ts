import * as monaco from "monaco-editor";
import { FileHandle } from "~/src/components/file/state";
import { fileSystem } from "~src/components/file/system";
import { Editor } from "../state/state";

interface Params {
	editor: Editor;
	/**
	 * The file to open in editor. Can be "null" when create new file.
	 */
	handle: FileHandle | null;
}

/**
 * Open a file in the editor, with new history.
 *
 * In practice, this is for "Open" and "New file".
 */
export const openFileInEditor = async (params: Params): Promise<void> => {
	const { editor, handle } = params;
	editor.getModel()?.dispose();
	const text = handle === null ? "" : await fileSystem.safeRead(handle);
	const model = monaco.editor.createModel(text, "markdown");
	editor.setModel(model);
};
