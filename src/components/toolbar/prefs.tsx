import { TippyProps } from "@tippyjs/react";
import { VscSettings } from "react-icons/vsc";
import { Button } from "~/src/components/button/button";
import { Popover } from "../popover/popover";
import { PrefsPanel } from "../prefs/panel/panel";
import { PrefsState } from "../prefs/state";

interface Props {
	singleton: TippyProps["singleton"];
	prefs: PrefsState;
}

export const ToolbarPrefs = (props: Props): JSX.Element => (
	<Popover content={<PrefsPanel prefs={props.prefs} />}>
		<Button
			Icon={VscSettings}
			tooltip="Preferences"
			tooltipSingleton={props.singleton}
			shortcut={[{ type: "command-or-control" }, { type: "char", value: "," }]}
		/>
	</Popover>
);
