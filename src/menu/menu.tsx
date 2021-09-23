import { Menu as HLMenu } from "@headlessui/react";
import { useState } from "react";
import { Button, ButtonProps } from "~src/button/button";
import { PopoverPortal } from "~src/popover/portal/portal";
import { MenuItem as MenuItemType } from "./item/interface";
import { MenuItem as MenuItemComponent } from "./item/item";
import sPopover from "~src/popover/popover.module.css";
import s from "./menu.module.css";
import { Key } from "~src/key/key";
import { MenuDivider } from "./divider/divider";
import { MenuHelp } from "./help/help";

interface Props {
	items: MenuItemType[];
	button: ButtonProps;
}

const Help = (): JSX.Element => (
	<div>
		<Key>↑</Key>
		<span> </span>
		<Key>↓</Key>
		<span> to navigate, </span>
		<Key>↵</Key>
		<span> to select, </span>
		<Key>esc</Key>
		<span> to close</span>
	</div>
);

export const Menu = (props: Props): JSX.Element => {
	const [reference, setReference] = useState<HTMLElement | null>(null);

	const items = (
		<HLMenu.Items static className={[sPopover.container, s.list].join(" ")}>
			{props.items.map((item, index) => (
				<MenuItemComponent key={index} item={item} />
			))}
			<MenuDivider />
			<MenuHelp help={{ content: <Help /> }} />
		</HLMenu.Items>
	);

	return (
		<HLMenu>
			{({ open }) => (
				<>
					<div ref={setReference}>
						<HLMenu.Button as={Button} selected={open} {...props.button} />
					</div>
					<PopoverPortal open={open} reference={reference}>
						{items}
					</PopoverPortal>
				</>
			)}
		</HLMenu>
	);
};
