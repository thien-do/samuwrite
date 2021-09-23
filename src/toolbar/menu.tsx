import { TippyProps } from "@tippyjs/react";
import { useCallback } from "react";
import { VscMenu } from "react-icons/vsc";
import { Button } from "~src/button/button";
import { useShortcut } from "~src/shortcut/use-shortcut";
import { SHORTCUTS } from "~src/toolbar/shortcuts";
import { Tooltip } from "~src/tooltip/tooltip";

interface Props {
	singleton: TippyProps["singleton"];
}

export const ToolbarMenu = (props: Props): JSX.Element => {
	const toggleMenu = useCallback(() => void window.alert("Coming soon"), []);

	useShortcut(SHORTCUTS.menu, toggleMenu);

	return (
		<Tooltip content="Menu" singleton={props.singleton}>
			<Button onClick={toggleMenu} Icon={VscMenu} shortcut={SHORTCUTS.menu} />
		</Tooltip>
	);
};
