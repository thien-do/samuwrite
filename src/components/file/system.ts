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

const read = async (handle: FileHandle): Promise<string> => {
	const permission = await verifyPermission(handle, "read");
	if (permission === false) throw Error("No permission");
	const file = await handle.getFile();
	const text = await file.text();
	return text;
};

export const fileSystem = {
	read,
};
