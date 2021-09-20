import { TippyProps } from "@tippyjs/react";
import { useCallback } from "react";
import { VscBook } from "react-icons/vsc";
import { Button } from "~/src/components/button/button";
import { ButtonMoreItem } from "~/src/components/button/more/menu";
import { useShortcut } from "~src/components/shortcut/use-shortcut";
import { SHORTCUTS } from "~src/components/toolbar/shortcuts";
import { vote } from "~src/utils/vote";
import { PrefsState } from "../prefs/state";
import { PreviewLayoutSplit } from "../preview/layout/split/split";

interface Props {
	singleton: TippyProps["singleton"];
	prefs: PrefsState;
}

const getMoreMenu = (props: Props): ButtonMoreItem[] => [
	{
		type: "custom",
		content: <PreviewLayoutSplit prefs={props.prefs} />,
	},
	{
		type: "action",
		action: () => vote(86),
		label: "Print…",
		shortcut: SHORTCUTS.print,
	},
];

export const ToolbarPreview = (props: Props): JSX.Element => {
	const { setPreviewVisible } = props.prefs;

	const toggle = useCallback(() => {
		setPreviewVisible((visible) => !visible);
	}, [setPreviewVisible]);

	useShortcut(SHORTCUTS.preview, toggle);

	return (
		<Button
			onClick={toggle}
			Icon={VscBook}
			shortcut={SHORTCUTS.preview}
			tooltip="Toggle Preview"
			tooltipSingleton={props.singleton}
			more={getMoreMenu(props)}
			selected={props.prefs.previewVisible}
		/>
	);
};
