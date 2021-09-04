import { TippyProps } from "@tippyjs/react";
import { VscBook } from "react-icons/vsc";
import { Button } from "~/src/components/button/button";
import { ButtonMoreMenuItem } from "~/src/components/button/more/menu";
import { PrefsState } from "../prefs/state";

interface Props {
	singleton: TippyProps["singleton"];
	prefs: PrefsState;
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

const toggleLayout = (layout: PrefsState["layout"]): PrefsState["layout"] => {
	if (layout !== "editor") return "editor";
	// return "preview";
	// return window.innerWidth < 1000 ? "preview" : "split";
	return "split";
};

export const ToolbarPreview = (props: Props): JSX.Element => (
	<Button
		onClick={() => void props.prefs.setLayout(toggleLayout)}
		Icon={VscBook}
		shortcut={[{ type: "command-or-control" }, { type: "char", value: "P" }]}
		tooltip="Toggle Preview"
		tooltipSingleton={props.singleton}
		more={[print(props)]}
		selected={props.prefs.layout !== "editor"}
	/>
);
