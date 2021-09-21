import { Menu as HLMenu } from "@headlessui/react";
import { TippyProps } from "@tippyjs/react";
import { useState } from "react";
import { Button, ButtonProps } from "~src/button/button";
import { MenuItem } from "./item/item";
import { MenuPopover } from "./popover/popover";

interface Props {
	tooltipSingleton: TippyProps["singleton"];
	items: MenuItem[];
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
					<MenuPopover items={props.items} button={button} open={open} />
				</>
			)}
		</HLMenu>
	);
};
