import { Menu as HLMenu, Portal, Transition } from "@headlessui/react";
import { TippyProps } from "@tippyjs/react";
import { Fragment, useRef, useState } from "react";
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

	// Transition + Portal + Popper is quite complicated. See:
	// https://github.com/tailwindlabs/headlessui/issues/154#issuecomment-742085996
	const menuRef = useRef<HTMLDivElement | null>(null);
	const [menu, setMenu] = useState<HTMLDivElement | null>(null);

	const { styles, attributes } = usePopper(button, menu, { placement: "top" });

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
					<Portal>
						<div
							ref={menuRef}
							style={styles.popper}
							{...attributes.popper}
							className={s.popper}
						>
							<Transition
								show={open}
								enter={s.enter}
								enterFrom={s.enterFrom}
								enterTo={s.enterTo}
								leave={s.enter}
								leaveFrom={s.enterTo}
								leaveTo={s.enterFrom}
								as={Fragment}
								beforeEnter={() => setMenu(menuRef.current)}
								afterLeave={() => setMenu(null)}
							>
								<HLMenu.Items
									static
									className={[sPopover.container, s.menu].join(" ")}
								>
									{props.items.map((item, index) => (
										<MenuItemComponent key={index} item={item} />
									))}
								</HLMenu.Items>
							</Transition>
						</div>
					</Portal>
				</>
			)}
		</HLMenu>
	);
};
