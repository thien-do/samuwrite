import { ERRORS } from "~src/utils/error";
import { FileModel } from "./state";
import {
	FileSystemHandle as BfsaFileSystemHandle,
	FirstCoreFileOptions,
} from "browser-fs-access";

const verifyPermission = async (
	handle: FileSystemFileHandle,
	mode: FileSystemPermissionMode
): Promise<boolean> => {
	// Check if permission was already granted. If so, return true.
	const query = await handle.queryPermission({ mode });
	if (query === "granted") return true;
	// Request permission. If the user grants permission, return true.
	const request = await handle.requestPermission({ mode });
	if (request === "granted") return true;
	// The user didn't grant permission, so return false.
	return false;
};

/**
 * Build a file model from the native handle.
 * - https://github.com/GoogleChromeLabs/browser-fs-access/blob/2522969fce3cbd05ba9386464dcd0ce02c7cedd9/src/fs-access/file-open.mjs#L18
 */
export const getFileModel = async (
	handle: FileSystemFileHandle
): Promise<FileModel> => {
	const permission = await verifyPermission(handle, "read");
	if (permission === false) throw ERRORS.permission;
	const file: FileModel = await handle.getFile();
	file.handle = handle as unknown as BfsaFileSystemHandle;
	return file;
};

export const filePickerOptions: FirstCoreFileOptions = {
	description: "Markdown files",
	excludeAcceptAllOption: false,
	extensions: [".md", ".txt", ".mdx"],
	mimeTypes: ["text/markdown", "text/plain"],
	startIn: "documents",
	id: "samuwrite",
};
