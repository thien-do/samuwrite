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
	const { setVim } = props.prefs;
	const toggle = useCallback(() => setVim((v) => !v), [setVim]);

	useShortcut(SHORTCUTS.vim, toggle);

	return (
		<Button
			onClick={toggle}
			Icon={DiVim}
			selected={props.prefs.vim}
			tooltip="Toggle Vim mode"
			tooltipSingleton={props.singleton}
			shortcut={SHORTCUTS.vim}
		/>
	);
};
