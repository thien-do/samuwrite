import { useEffect, useMemo } from "react";

type UnloadEvent = (this: Window, ev: WindowEventMap["beforeunload"]) => void;

export const useUnload = (handler: UnloadEvent): void => {
	const callback = useMemo(() => handler, [handler]);

	useEffect(() => {
		window.addEventListener("beforeunload", callback);
		return () => window.removeEventListener("beforeunload", callback);
	}, [callback]);
};
