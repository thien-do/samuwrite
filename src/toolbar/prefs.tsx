import { TippyProps } from "@tippyjs/react";
import { VscSettings } from "react-icons/vsc";
import { Popover } from "../popover/popover";
import { PrefsPanel } from "../prefs/panel/panel";
import { PrefsState } from "../prefs/state";
import { useCallback } from "react";
import { SHORTCUTS } from "~src/toolbar/shortcuts";
import { useShortcut } from "~src/shortcut/use-shortcut";
import { Tooltip } from "~src/tooltip/tooltip";

interface Props {
	singleton: TippyProps["singleton"];
	prefs: PrefsState;
}

export const ToolbarPrefs = (props: Props): JSX.Element => {
	const { setPrefsVisible } = props.prefs;

	const toggle = useCallback(() => {
		setPrefsVisible((visible) => !visible);
	}, [setPrefsVisible]);

	useShortcut(SHORTCUTS.prefs, toggle);

	return (
		<Tooltip content="Preferences…" singleton={props.singleton}>
			<Popover
				open={props.prefs.prefsVisible}
				button={{
					onClick: toggle,
					Icon: VscSettings,
					shortcut: SHORTCUTS.prefs,
				}}
			>
				<PrefsPanel prefs={props.prefs} />
			</Popover>
		</Tooltip>
	);
};
