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
	{
		type: "link",
		label: "Version: 1.0",
		url: "https://github.com/thien-do/samuwrite/releases/tag/v1.0",
		target: "_blank",
	},
	{ type: "divider" },
	{
		type: "link",
		label: "Support",
		url: "https://github.com/thien-do/samuwrite/issues/new",
		target: "_blank",
	},
	{
		type: "link",
		label: "GitHub",
		url: "https://github.com/thien-do/samuwrite",
		target: "_blank",
	},
	{
		type: "link",
		label: "Telegram",
		url: "https://t.me/samuwrite",
		target: "_blank",
	},
	{
		type: "link",
		label: "Twitter",
		url: "https://twitter.com/_thiendo",
		target: "_blank",
	},
	{ type: "divider" },
	{
		type: "link",
		label: "About",
		url: "https://github.com/thien-do/samuwrite/blob/main/README.md",
		target: "_blank",
	},
	{
		type: "link",
		label: "Privacy Policy",
		url: "https://github.com/thien-do/samuwrite/blob/main/docs/privacy.md",
		target: "_blank",
	},
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
