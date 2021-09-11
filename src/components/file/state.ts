import { useEffect, useState } from "react";
import { SetState } from "~src/utils/state/type";
import { get, set } from "idb-keyval";

export type FileHandle = FileSystemFileHandle;

export interface FileState {
	handle: FileHandle | null;
	setHandle: SetState<FileHandle | null>;
	dirty: boolean;
	setDirty: SetState<boolean>;
	recent: FileHandle | null;
	setRecent: SetState<FileHandle | null>;
}

export const useFile = (): FileState => {
	const [handle, setHandle] = useState<FileHandle | null>(null);
	const [dirty, setDirty] = useState(false);
	// The one in "Open" > "Open Recent" menu
	const [recent, setRecent] = useState<FileHandle | null>(null);

	// Load the saved handle as "recent"
	useEffect(() => {
		get<FileHandle>("handle").then((handle) => {
			if (handle) setRecent(handle);
		});
	}, []);

	// Save the current handle as "recent"
	useEffect(() => {
		if (handle === null) return;
		set("handle", handle);
		setRecent(handle);
	}, [handle]);

	return { handle, setHandle, dirty, setDirty, recent, setRecent };
};
