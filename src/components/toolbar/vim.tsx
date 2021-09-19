import { TippyProps } from "@tippyjs/react";
import { DiVim } from "react-icons/di";
import { Button } from "~/src/components/button/button";
import { PrefsState } from "~src/components/prefs/state";
import { SHORTCUTS } from "~src/components/toolbar/shortcuts";
import { useShortcut } from "~src/components/shortcut/use-shortcut";
import { useCallback } from "react";

interface Props {
	singleton: TippyProps["singleton"];
	prefs: PrefsState;
}

export const ToolbarVim = (props: Props): JSX.Element => {
	const toggleVimMode = useCallback(
		() => props.prefs.setVim((v) => !v),
		// eslint-disable-next-line
		[props.prefs.setVim]
	);

	useShortcut(SHORTCUTS.VIM_MODE, toggleVimMode);

	return (
		<Button
			onClick={toggleVimMode}
			Icon={DiVim}
			selected={props.prefs.vim}
			tooltip="Toggle Vim mode"
			tooltipSingleton={props.singleton}
			shortcut={SHORTCUTS.VIM_MODE}
		/>
	);
};
