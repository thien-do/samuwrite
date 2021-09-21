import { Menu as HLMenu, Portal } from "@headlessui/react";
import { TippyProps } from "@tippyjs/react";
import { useState } from "react";
import { usePopper } from "react-popper";
import { Button, ButtonProps } from "~src/button/button";
import { MenuItem, MenuItemComponent } from "./item/item";
import sPopover from "~src/popover/popover.module.css";
import s from "./menu.module.css";

interface Props {
	tooltipSingleton: TippyProps["singleton"];
	items: MenuItem[];
	button: ButtonProps;
}

export const Menu = (props: Props): JSX.Element => {
	const [button, setButton] = useState<HTMLButtonElement | null>(null);
	const [menu, setMenu] = useState<HTMLDivElement | null>(null);
	const { styles, attributes } = usePopper(button, menu, { placement: "top" });

	return (
		<HLMenu>
			{({ open }) => (
				<>
					<HLMenu.Button
						as={Button}
						ref={setButton}
						selected={open}
						{...props.button}
					/>
					<Portal>
						<HLMenu.Items
							ref={setMenu}
							style={styles.popper}
							className={[sPopover.container, s.menu].join(" ")}
							{...attributes.popper}
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
