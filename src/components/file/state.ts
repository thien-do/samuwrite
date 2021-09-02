import { useCallback, useEffect, useState } from "react";
import { SetState } from "~src/utils/state/type";
import { set } from "idb-keyval";

export type FileHandle = FileSystemFileHandle;

export interface FileState {
	handle: FileHandle | null;
	setHandle: SetState<FileHandle | null>;
	dirty: boolean;
	setDirty: SetState<boolean>;
	setFile: (handle: FileHandle | null) => void;
}

const useSaveHandle = (handle: FileHandle | null): void => {
	useEffect(() => {
		if (handle !== null) set("handle", handle);
	}, [handle]);
};

export const useFile = (): FileState => {
	const [handle, setHandle] = useState<FileHandle | null>(null);
	const [dirty, setDirty] = useState(false);

	useSaveHandle(handle);

	const setFile = useCallback((handle: FileHandle | null): void => {
		setHandle(handle);
		setDirty(false);
	}, []);

	return { handle, setHandle, dirty, setDirty, setFile };
};
