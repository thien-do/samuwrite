import { TippyProps } from "@tippyjs/react";
import { useCallback } from "react";
import { VscBook } from "react-icons/vsc";
import { Button } from "~src/button/button";
import { Editor } from "~src/editor/state/state";
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
	editor: Editor;
}

const getMoreMenu = (props: Props): MenuItem[] => [
	...getPreviewSplitMenu(props.prefs),
	...getPreviewTemplateMenu(props.prefs),
];

export const ToolbarPreview = (props: Props): JSX.Element => {
	const { previewVisible, setPreviewVisible, previewSplit } = props.prefs;

	const toggle = useCallback(() => {
		const previewing = !previewVisible;
		setPreviewVisible(previewing);
		// Not focus on editor when previewing in full mode
		if (!previewSplit && previewing) return;
		if (!props.editor.hasTextFocus()) {
			props.editor.focus();
		}
	}, [props.editor, previewSplit, previewVisible, setPreviewVisible]);

	useShortcut({ keys: SHORTCUTS.preview, callback: toggle });

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
