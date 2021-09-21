import { TippyProps } from "@tippyjs/react";
import { VscMenu } from "react-icons/vsc";
import { Button } from "~src/button/button";
import { SHORTCUTS } from "~src/toolbar/shortcuts";
import { useShortcut } from "~src/shortcut/use-shortcut";
import { useCallback } from "react";

interface Props {
	singleton: TippyProps["singleton"];
}

export const ToolbarMenu = (props: Props): JSX.Element => {
	const toggleMenu = useCallback(() => void window.alert("Coming soon"), []);

	useShortcut(SHORTCUTS.menu, toggleMenu);

	return (
		<Button
			onClick={toggleMenu}
			Icon={VscMenu}
			shortcut={SHORTCUTS.menu}
			tooltip="Menu"
			tooltipSingleton={props.singleton}
		/>
	);
};
