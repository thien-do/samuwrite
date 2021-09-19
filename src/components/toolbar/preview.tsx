import { TippyProps } from "@tippyjs/react";
import { VscBook } from "react-icons/vsc";
import { Button } from "~/src/components/button/button";
import { ButtonMoreMenuItem } from "~/src/components/button/more/menu";
import { PrefsState } from "../prefs/state";
import { SHORTCUTS } from "~src/components/toolbar/shortcuts";
import { useShortcut } from "~src/components/shortcut/use-shortcut";
import { useCallback } from "react";

interface Props {
	singleton: TippyProps["singleton"];
	prefs: PrefsState;
}

const print = (_props: Props): ButtonMoreMenuItem => ({
	action: () => window.alert("Coming soon"),
	label: "Print…",
	shortcut: SHORTCUTS.print,
});

const updater = (layout: PrefsState["layout"]): PrefsState["layout"] => {
	if (layout !== "editor") return "editor";
	// return "preview";
	// return window.innerWidth < 1000 ? "preview" : "split";
	return "split";
};

export const ToolbarPreview = (props: Props): JSX.Element => {
	const { setLayout } = props.prefs;

	const toggle = useCallback(() => setLayout(updater), [setLayout]);

	useShortcut(SHORTCUTS.preview, toggle);

	return (
		<Button
			onClick={toggle}
			Icon={VscBook}
			shortcut={SHORTCUTS.preview}
			tooltip="Toggle Preview"
			tooltipSingleton={props.singleton}
			more={[print(props)]}
			selected={props.prefs.layout !== "editor"}
		/>
	);
};
