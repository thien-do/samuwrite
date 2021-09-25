import { FileHandle } from "./state";
import { FirstFileOpenOptions } from "browser-fs-access";
import {
	toFileSystemFileHandle,
	UnifiedFileSystemHandle,
} from "~src/utils/file";

const verifyPermission = async (
	handle: UnifiedFileSystemHandle,
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

export const safeGetFile = async (
	fileHandle: UnifiedFileSystemHandle
): Promise<File> => {
	const permission = await verifyPermission(fileHandle, "read");
	if (permission === false)
		throw Error("Cannot read file because permission is not granted");
	const handle = toFileSystemFileHandle(fileHandle);
	const file = await handle.getFile();
	return file;
};

const safeRead = async (fileHandle: FileHandle): Promise<string> => {
	const text = await fileHandle.text();
	return text;
};

const optionTypes: [FirstFileOpenOptions<boolean>] = [
	{
		description: "Text files",
		mimeTypes: ["text/markdown", "text/plain"],
		extensions: [".md", ".mdx", ".txt", ".text"],
		multiple: false,
	},
];

export const fileSystem = {
	/**
	 * Read a file, asking for permission if not granted
	 */
	safeRead,
	/**
	 * The "types" in open or save file dialog
	 */
	optionTypes,
};
