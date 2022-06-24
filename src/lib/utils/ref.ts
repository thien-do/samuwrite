import { MutableRefObject, RefObject } from "react";

export const getRef = <T>(
	ref: RefObject<T> | MutableRefObject<T | null>,
	message: string
): T => {
	const current = ref.current;
	if (current === null) throw Error(message);
	return current;
};
