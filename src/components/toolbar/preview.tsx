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
	shortcut: SHORTCUTS.PRINT,
});

const toggleLayout = (layout: PrefsState["layout"]): PrefsState["layout"] => {
	if (layout !== "editor") return "editor";
	// return "preview";
	// return window.innerWidth < 1000 ? "preview" : "split";
	return "split";
};

export const ToolbarPreview = (props: Props): JSX.Element => {
	const togglePreview = useCallback(
		() => void props.prefs.setLayout(toggleLayout),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[props.prefs.setLayout, toggleLayout]
	);

	useShortcut(SHORTCUTS.PREVIEW, togglePreview);

	return (
		<Button
			onClick={togglePreview}
			Icon={VscBook}
			shortcut={SHORTCUTS.PREVIEW}
			tooltip="Toggle Preview"
			tooltipSingleton={props.singleton}
			more={[print(props)]}
			selected={props.prefs.layout !== "editor"}
		/>
	);
};
