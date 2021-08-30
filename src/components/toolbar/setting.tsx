import { TippyProps } from "@tippyjs/react";
import { VscSettings } from "react-icons/vsc";
import { Button } from "~/src/components/button/button";

interface Props {
	singleton: TippyProps["singleton"];
}

export const ToolbarSetting = (props: Props): JSX.Element => (
	<Button
		onClick={() => void window.alert("Coming soon")}
		Icon={VscSettings}
		tooltip="Preferences"
		tooltipSingleton={props.singleton}
		shortcut={[{ type: "command-or-control" }, { type: "char", value: "," }]}
	/>
);
