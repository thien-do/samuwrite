export const verifyFilePermission = async (
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
