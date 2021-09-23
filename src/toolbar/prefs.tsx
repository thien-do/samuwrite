import { TippyProps } from "@tippyjs/react";
import { useRef } from "react";
import { VscSettings } from "react-icons/vsc";
import { SHORTCUTS } from "~src/toolbar/shortcuts";
import { Tooltip } from "~src/tooltip/tooltip";
import { Popover } from "../popover/popover";
import { PrefsPanel } from "../prefs/panel/panel";
import { PrefsState } from "../prefs/state";

interface Props {
	singleton: TippyProps["singleton"];
	prefs: PrefsState;
}

export const ToolbarPrefs = (props: Props): JSX.Element => {
	// Use this instead of "autoFocus" in order for the "enter" transition at
	// PopoverPortal to work
	const focusRef = useRef<HTMLDivElement>(null);
	const focus = () => {
		const element = focusRef.current;
		if (element === null) throw Error("No element to focus");
		element.focus();
	};

	return (
		<Tooltip content="Preferences…" singleton={props.singleton}>
			<Popover
				button={{ Icon: VscSettings, shortcut: SHORTCUTS.prefs }}
				afterEnter={focus}
			>
				<PrefsPanel prefs={props.prefs} focusRef={focusRef} />
			</Popover>
		</Tooltip>
	);
};
