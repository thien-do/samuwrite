import { Menu as HLMenu } from "@headlessui/react";
import { useState } from "react";
import { Button, ButtonProps } from "~src/button/button";
import { Portal } from "~src/portal/portal";
import { MenuItem as MenuItemType } from "./item/interface";
import { MenuItem as MenuItemComponent } from "./item/item";
import sPopover from "~src/popover/popover.module.css";
import s from "./menu.module.css";

interface Props {
	items: MenuItemType[];
	button: ButtonProps;
}

export const Menu = (props: Props): JSX.Element => {
	const [button, setButton] = useState<HTMLButtonElement | null>(null);
	return (
		<HLMenu>
			{({ open }) => (
				<>
					<HLMenu.Button
						ref={setButton}
						as={Button}
						selected={open}
						{...props.button}
					/>
					<Portal open={open} reference={button}>
						<HLMenu.Items
							static
							className={[sPopover.container, s.list].join(" ")}
						>
							{props.items.map((item, index) => (
								<MenuItemComponent key={index} item={item} />
							))}
						</HLMenu.Items>
					</Portal>
				</>
			)}
		</HLMenu>
	);
};
