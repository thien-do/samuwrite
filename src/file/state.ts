import { get, set } from "idb-keyval";
import { useEffect, useState } from "react";
import { SetState } from "~src/utils/state/type";
import { FileWithHandle, FileSystemHandle } from "browser-fs-access";

export type FileHandle = FileWithHandle;

export interface FileState {
	handle: FileHandle | null;
	setHandle: SetState<FileHandle | null>;
	dirty: boolean;
	setDirty: SetState<boolean>;
	recent: FileSystemHandle | null;
	setRecent: SetState<FileSystemHandle | null>;
}

export const useFile = (): FileState => {
	const [handle, setHandle] = useState<FileHandle | null>(null);
	const [dirty, setDirty] = useState(false);
	// The one in "Open" > "Open Recent" menu
	const [recent, setRecent] = useState<FileSystemHandle | null>(null);

	// Load the saved handle as "recent"
	useEffect(() => {
		get<FileSystemHandle>("handle").then((handle) => {
			if (handle) setRecent(handle);
		});
	}, []);

	// Save the current handle as "recent"
	useEffect(() => {
		if (handle === null) return;
		// idb-keyval does not support saving FileWithHandle
		// then we'd like to save FileSystemHandle which can be used for
		// convert again to FileWithHandle
		const fileHandle = handle.handle || null;
		if (fileHandle) {
			set("handle", fileHandle);
			setRecent(fileHandle);
		}
	}, [handle]);

	return { handle, setHandle, dirty, setDirty, recent, setRecent };
};
