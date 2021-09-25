import {
	FileSystemHandle as BrowserFSAccessFileSystemHandle,
	FileWithHandle,
} from "browser-fs-access";
import { safeGetFile } from "~src/file/system";

export type UnifiedFileSystemHandle =
	| FileSystemHandle
	| BrowserFSAccessFileSystemHandle;

export const toFileSystemFileHandle = (
	fileHandle: UnifiedFileSystemHandle
): FileSystemFileHandle => {
	// Because browser-fs-access is handling for both folder and file
	// So that, its FileSystemHandle is not contains method getFile() that is
	// specified for file handle
	// Fortunately, there is no omiting, we can force convert it to FileSystemFileHandle
	// for bypasss type checking
	// https://github.com/GoogleChromeLabs/browser-fs-access/blob/2522969fce3cbd05ba9386464dcd0ce02c7cedd9/src/fs-access/file-open.mjs#L18
	if (fileHandle.kind !== "file") {
		throw Error(
			"Cannot convert to FileSystemFileHandle because kind is not file"
		);
	}
	return fileHandle as unknown as FileSystemFileHandle;
};

// https://github.com/GoogleChromeLabs/browser-fs-access/blob/2522969fce3cbd05ba9386464dcd0ce02c7cedd9/src/fs-access/file-open.mjs#L18
export const toFileWithHandle = async (
	handle: UnifiedFileSystemHandle
): Promise<FileWithHandle> => {
	const file: FileWithHandle = await safeGetFile(handle);
	file.handle = handle as unknown as BrowserFSAccessFileSystemHandle;
	return file;
};
