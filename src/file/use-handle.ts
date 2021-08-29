import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { set } from "idb-keyval";

export type Handle = FileSystemFileHandle;

export interface HandleState {
	handle: Handle | null;
	setHandle: Dispatch<SetStateAction<Handle | null>>;
}

export const useFileHandle = (): HandleState => {
	const [handle, setHandle] = useState<Handle | null>(null);

	// Save handle to local (use indexDB since localStorage cannot store the
	// stringified handle)
	useEffect(() => {
		if (handle !== null) set("handle", handle);
	}, [handle]);

	return { handle, setHandle };
};
