import { TippyProps } from "@tippyjs/react";
import { DiVim } from "react-icons/di";
import { Button } from "../../components/button/button";

interface Props {
	singleton: TippyProps["singleton"];
}

export const ToolbarVim = (props: Props): JSX.Element => (
	<Button
		onClick={() => window.alert("Coming soon")}
		Icon={DiVim}
		tooltip="Toggle Vim mode"
		tooltipSingleton={props.singleton}
		shortcut={[{ type: "command-or-control" }, { type: "char", value: "M" }]}
	/>
);
