import { useCallback } from "react";
import { useShortcut } from "~src/shortcut/use-shortcut";

interface Props {
	keys: string;
	reference: HTMLElement | null;
}

export const PopoverShortcut = (props: Props): null => {
	const { reference } = props;

	const callback = useCallback(() => {
		// It's better to ref to the button directly, but the button is
		// optionally ref-ed for other purposes so it's more reliable to use
		// its parent ref
		const button = reference?.querySelector("button") ?? null;
		if (button === null) throw Error("No button to open Popover");
		// Not very reliable. See:
		// - https://github.com/tailwindlabs/headlessui/discussions/828
		// - https://github.com/tailwindlabs/headlessui/issues/427
		button.click();
	}, [reference]);

	useShortcut(props.keys, callback);

	return null;
};
