import { TippyProps } from "@tippyjs/react";
import { DiVim } from "react-icons/di";
import { Button } from "~/src/components/button/button";
import { PrefsState } from "~src/components/prefs/state";

interface Props {
	singleton: TippyProps["singleton"];
	prefs: PrefsState;
}

export const ToolbarVim = (props: Props): JSX.Element => (
	<Button
		onClick={() => props.prefs.setVim((v) => !v)}
		Icon={DiVim}
		selected={props.prefs.vim}
		tooltip="Toggle Vim mode"
		tooltipSingleton={props.singleton}
		shortcut={[{ type: "command-or-control" }, { type: "char", value: "M" }]}
	/>
);
