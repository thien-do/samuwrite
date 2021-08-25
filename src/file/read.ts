import { verifyFilePermission } from "./permission";

export const readFile = async (
	handle: FileSystemFileHandle
): Promise<string> => {
	const permission = await verifyFilePermission(handle, "read");
	if (permission === false) throw Error("No permission");
	const file = await handle.getFile();
	const text = await file.text();
	return text;
};
