import { TippyProps } from "@tippyjs/react";
import { VscSettings } from "react-icons/vsc";
import { Button } from "~/src/components/button/button";
import { Popover } from "../popover/popover";
import { PrefsPanel } from "../prefs/panel/panel";
import { PrefsState } from "../prefs/state";
import { useState } from "react";
import { SHORTCUTS } from "~src/components/toolbar/shortcuts";
import { useShortcut } from "~src/components/shortcut/use-shortcut";

interface Props {
	singleton: TippyProps["singleton"];
	prefs: PrefsState;
}

export const ToolbarPrefs = (props: Props): JSX.Element => {
	const [visible, setVisible] = useState(false);

	const togglePrefs = () => void setVisible((v) => !v);

	useShortcut(SHORTCUTS.PREFERENCES, togglePrefs);

	return (
		<Popover
			visible={visible}
			onClickOutside={togglePrefs}
			content={<PrefsPanel prefs={props.prefs} />}
		>
			<Button
				onClick={togglePrefs}
				Icon={VscSettings}
				tooltip="Preferences"
				tooltipSingleton={props.singleton}
				shortcut={SHORTCUTS.PREFERENCES}
			/>
		</Popover>
	);
};
