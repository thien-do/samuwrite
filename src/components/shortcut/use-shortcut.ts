import { useEffect } from "react";
import Mousetrap from "mousetrap";
import "mousetrap/plugins/global-bind/mousetrap-global-bind";

export const useShortcut = (keys: string, callback: () => void): void => {
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
