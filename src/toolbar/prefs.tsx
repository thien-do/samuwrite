import { TippyProps } from "@tippyjs/react";
import { VscSettings } from "react-icons/vsc";
import { Button } from "~src/button/button";
import { Popover } from "../popover/popover";
import { PrefsPanel } from "../prefs/panel/panel";
import { PrefsState } from "../prefs/state";
import { useCallback } from "react";
import { SHORTCUTS } from "~src/toolbar/shortcuts";
import { useShortcut } from "~src/shortcut/use-shortcut";

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
		<Popover
			visible={props.prefs.prefsVisible}
			onClickOutside={toggle}
			content={<PrefsPanel prefs={props.prefs} />}
		>
			<Button
				onClick={toggle}
				Icon={VscSettings}
				tooltip="Preferences"
				tooltipSingleton={props.singleton}
				shortcut={SHORTCUTS.prefs}
			/>
		</Popover>
	);
};
