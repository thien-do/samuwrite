import { TippyProps } from "@tippyjs/react";
import { useCallback } from "react";
import { DiVim } from "react-icons/di";
import { Button } from "~src/button/button";
import { PrefsState } from "~src/prefs/state";
import { useShortcut } from "~src/shortcut/use-shortcut";
import { SHORTCUTS } from "~src/toolbar/shortcuts";
import { Tooltip } from "~src/tooltip/tooltip";

interface Props {
	singleton: TippyProps["singleton"];
	prefs: PrefsState;
}

export const ToolbarVim = (props: Props): JSX.Element => {
	const { setVim } = props.prefs;
	const toggle = useCallback(() => setVim((v) => !v), [setVim]);

	useShortcut({ keys: SHORTCUTS.vim, callback: toggle });

	return (
		<Tooltip content="Toggle Vim mode" singleton={props.singleton}>
			<Button
				onClick={toggle}
				Icon={DiVim}
				selected={props.prefs.vim}
				shortcut={SHORTCUTS.vim}
			/>
		</Tooltip>
	);
};
