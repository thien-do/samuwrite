import { useEffect } from "react";
import mousetrap, { ExtendedKeyboardEvent } from "mousetrap";
import "mousetrap/plugins/global-bind/mousetrap-global-bind";
import { ShortcutKey, toMousetrapKey } from "~src/components/shortcut/shortcut";

export const useShortcut = (
	shortcut: ShortcutKey[],
	callback: (e: ExtendedKeyboardEvent, combo: string) => void
): void => {
	const key = toMousetrapKey(shortcut);

	useEffect(() => {
		mousetrap.bindGlobal(key, (event, combo) => {
			event.preventDefault();
			callback(event, combo);
		});
		return () => void mousetrap.unbind(key);
	}, [key, callback]);
};
