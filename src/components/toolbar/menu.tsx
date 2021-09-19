import { TippyProps } from "@tippyjs/react";
import { VscMenu } from "react-icons/vsc";
import { Button } from "~/src/components/button/button";
import { SHORTCUTS } from "~src/components/toolbar/shortcuts";
import { useShortcut } from "~src/components/shortcut/use-shortcut";

interface Props {
	singleton: TippyProps["singleton"];
}

export const ToolbarMenu = (props: Props): JSX.Element => {
	const toggleMenu = () => void window.alert("Coming soon");

	useShortcut(SHORTCUTS.MENU, toggleMenu);

	return (
		<Button
			onClick={toggleMenu}
			Icon={VscMenu}
			shortcut={SHORTCUTS.MENU}
			tooltip="Menu"
			tooltipSingleton={props.singleton}
		/>
	);
};
