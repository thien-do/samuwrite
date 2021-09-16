import { FileHandle } from "./state";

const verifyPermission = async (
	handle: FileHandle,
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

const safeRead = async (handle: FileHandle): Promise<string> => {
	const permission = await verifyPermission(handle, "read");
	if (permission === false)
		throw Error("Cannot read file because permission is not granted");
	const file = await handle.getFile();
	const text = await file.text();
	return text;
};

const optionTypes: FilePickerOptions["types"] = [
	{
		description: "Text files",
		accept: {
			"text/markdown": [".md", ".mdx"],
			"text/plain": [".txt", ".text"],
		},
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
