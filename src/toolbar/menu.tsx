import { TippyProps } from "@tippyjs/react";
import { VscMenu } from "react-icons/vsc";
import { MenuItem } from "~src/menu/item/interface";
import { Menu } from "~src/menu/menu";
import { SHORTCUTS } from "~src/toolbar/shortcuts";
import { Tooltip } from "~src/tooltip/tooltip";

interface Props {
	singleton: TippyProps["singleton"];
}

const MENU_ITEMS: MenuItem[] = [
	{ type: "link", label: "Version 1.0", url: "#", target: "_blank" },
	{ type: "divider" },
	{ type: "link", label: "Support", url: "#", target: "_blank" },
	{ type: "link", label: "GitHub", url: "#", target: "_blank" },
	{ type: "link", label: "Twitter", url: "#", target: "_blank" },
	{ type: "divider" },
	{ type: "link", label: "About Us", url: "#", target: "_blank" },
	{ type: "link", label: "Privacy Policy", url: "#", target: "_blank" },
];

export const ToolbarMenu = (props: Props): JSX.Element => (
	<Tooltip content="Menu" singleton={props.singleton}>
		<Menu
			button={{ Icon: VscMenu, shortcut: SHORTCUTS.menu }}
			items={MENU_ITEMS}
			shortcut={SHORTCUTS.menu}
		/>
	</Tooltip>
);
