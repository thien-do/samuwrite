import { TippyProps } from "@tippyjs/react";
import { VscBook } from "react-icons/vsc";
import { Button } from "../../components/button/button";
import { ButtonMoreMenuItem } from "../../components/button/more/menu";

interface Props {
	singleton: TippyProps["singleton"];
}

const print = (_props: Props): ButtonMoreMenuItem => ({
	action: () => window.alert("Coming soon"),
	label: "Print…",
	shortcut: [
		{ type: "command-or-control" },
		{ type: "shift" },
		{ type: "char", value: "P" },
	],
});

export const ToolbarPreview = (props: Props): JSX.Element => (
	<Button
		onClick={() => window.alert("Coming soon")}
		Icon={VscBook}
		shortcut={[{ type: "command-or-control" }, { type: "char", value: "P" }]}
		tooltip="Toggle Preview"
		tooltipSingleton={props.singleton}
		more={[print(props)]}
	/>
);
