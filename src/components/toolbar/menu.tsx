import { TippyProps } from "@tippyjs/react";
import { VscMenu } from "react-icons/vsc";
import { Button } from "~/src/components/button/button";

interface Props {
	singleton: TippyProps["singleton"];
}

export const ToolbarMenu = (props: Props): JSX.Element => (
	<Button
		onClick={() => void window.alert("Coming soon")}
		Icon={VscMenu}
		shortcut={[{ type: "command-or-control" }, { type: "char", value: "/" }]}
		tooltip="Menu"
		tooltipSingleton={props.singleton}
	/>
);
