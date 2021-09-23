import { useEffect } from "react";
import Mousetrap from "mousetrap";
import "mousetrap/plugins/global-bind/mousetrap-global-bind";

interface Params {
	keys: string;
	callback: () => void;
}

export const useShortcut = (params: Params): void => {
	const { keys, callback } = params;

	useEffect(() => {
		Mousetrap.bindGlobal(keys, (event) => {
			event.preventDefault();
			callback();
		});

		return () => {
			Mousetrap.unbind(keys);
		};
	}, [keys, callback]);
};
