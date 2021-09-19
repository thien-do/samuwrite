import { TippyProps } from "@tippyjs/react";
import { DiVim } from "react-icons/di";
import { Button } from "~/src/components/button/button";
import { PrefsState } from "~src/components/prefs/state";
import { SHORTCUTS } from "~src/components/toolbar/shortcuts";
import { useShortcut } from "~src/components/shortcut/use-shortcut";

interface Props {
	singleton: TippyProps["singleton"];
	prefs: PrefsState;
}

export const ToolbarVim = (props: Props): JSX.Element => {
	const toggleVimMode = () => props.prefs.setVim((v) => !v);

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
