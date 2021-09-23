import { MenuAction } from "../action/action";
import { MenuDivider } from "../divider/divider";
import { MenuGroup } from "../group/group";
import { MenuHeading } from "../heading/heading";
import { MenuHelp } from "../help/help";
import { MenuItem as MenuItemType } from "./interface";

interface Props {
	item: MenuItemType;
}

export const MenuItem = ({ item }: Props): JSX.Element => {
	switch (item.type) {
		case "divider":
			return <MenuDivider />;
		case "heading":
			return <MenuHeading heading={item} />;
		case "help":
			return <MenuHelp help={item} />;
		case "action":
			return <MenuAction action={item} />;
		case "group":
			return <MenuGroup group={item} />;
	}
};
