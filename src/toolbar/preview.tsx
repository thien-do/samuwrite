import { TippyProps } from "@tippyjs/react";
import { useCallback } from "react";
import { VscBook } from "react-icons/vsc";
import { Button } from "~src/button/button";
import { MenuItem } from "~src/menu/item/interface";
import { getPreviewSplitMenu } from "~src/preview/layout/split";
import { getPreviewTemplateMenu } from "~src/preview/template/menu";
import { useShortcut } from "~src/shortcut/use-shortcut";
import { SHORTCUTS } from "~src/toolbar/shortcuts";
import { Tooltip } from "~src/tooltip/tooltip";
import { PrefsState } from "../prefs/state";

interface Props {
	singleton: TippyProps["singleton"];
	prefs: PrefsState;
}

const getMoreMenu = (props: Props): MenuItem[] => [
	...getPreviewSplitMenu(props.prefs),
	...getPreviewTemplateMenu(props.prefs),
];

export const ToolbarPreview = (props: Props): JSX.Element => {
	const { setPreviewVisible } = props.prefs;

	const toggle = useCallback(() => {
		setPreviewVisible((visible) => !visible);
	}, [setPreviewVisible]);

	useShortcut(SHORTCUTS.preview, toggle);

	return (
		<Tooltip content="Toggle Preview" singleton={props.singleton}>
			<Button
				onClick={toggle}
				Icon={VscBook}
				shortcut={SHORTCUTS.preview}
				more={getMoreMenu(props)}
				selected={props.prefs.previewVisible}
			/>
		</Tooltip>
	);
};
