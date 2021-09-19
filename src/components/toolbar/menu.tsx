import { TippyProps } from "@tippyjs/react";
import { VscMenu } from "react-icons/vsc";
import { Button } from "~/src/components/button/button";
import { SHORTCUTS } from "~src/components/toolbar/shortcuts";
import { useShortcut } from "~src/components/shortcut/use-shortcut";
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
