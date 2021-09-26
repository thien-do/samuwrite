import { get, set } from "idb-keyval";
import { useEffect, useState } from "react";
import { SetState } from "~src/utils/state/type";
import { FileWithHandle } from "browser-fs-access";

export type FileModel = FileWithHandle;

export interface FileState {
	model: FileModel | null;
	setModel: SetState<FileModel | null>;
	dirty: boolean;
	setDirty: SetState<boolean>;
	recent: FileSystemFileHandle | null;
	setRecent: SetState<FileSystemFileHandle | null>;
}

export const useFile = (): FileState => {
	const [model, setModel] = useState<FileModel | null>(null);
	const [dirty, setDirty] = useState(false);
	const [recent, setRecent] = useState<FileSystemFileHandle | null>(null);

	// Load the saved handle as "recent"
	useEffect(() => {
		get<FileSystemFileHandle>("handle").then((handle) => {
			if (handle) setRecent(handle);
		});
	}, []);

	// Save the current handle as "recent"
	useEffect(() => {
		const handle = model?.handle;
		// When no file or when in not supported browsers
		if (handle === undefined) return;
		set("handle", handle);
		// BFSA's FileSystemFileHandle is same as native's FileSystemFileHandle.
		// We still need to make sure it's not a directory handle.
		if (handle.kind === "directory") throw Error("Handle is directory");
		setRecent(handle as unknown as FileSystemFileHandle);
	}, [model]);

	return { model, setModel, dirty, setDirty, recent, setRecent };
};
