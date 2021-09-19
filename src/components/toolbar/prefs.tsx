import { TippyProps } from "@tippyjs/react";
import { VscSettings } from "react-icons/vsc";
import { Button } from "~/src/components/button/button";
import { Popover } from "../popover/popover";
import { PrefsPanel } from "../prefs/panel/panel";
import { PrefsState } from "../prefs/state";
import { useCallback, useState } from "react";
import { SHORTCUTS } from "~src/components/toolbar/shortcuts";
import { useShortcut } from "~src/components/shortcut/use-shortcut";

interface Props {
	singleton: TippyProps["singleton"];
	prefs: PrefsState;
}

export const ToolbarPrefs = (props: Props): JSX.Element => {
	const [visible, setVisible] = useState(false);

	const toggle = useCallback(() => setVisible((v) => !v), [setVisible]);

	useShortcut(SHORTCUTS.prefs, toggle);

	return (
		<Popover
			visible={visible}
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
