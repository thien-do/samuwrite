import { Menu as HLMenu, Portal, Transition } from "@headlessui/react";
import { Fragment, useRef, useState } from "react";
import { usePopper } from "react-popper";
import sPopover from "~src/popover/popover.module.css";
import { MenuItem, MenuItemComponent } from "../item/item";
import s from "./popover.module.css";

interface Props {
	open: boolean;
	button: HTMLButtonElement | null;
	items: MenuItem[];
}

export const MenuPopover = (props: Props): JSX.Element => {
	// Transition + Portal + Popper is quite complicated. See:
	// https://github.com/tailwindlabs/headlessui/issues/154#issuecomment-742085996
	const containerRef = useRef<HTMLDivElement | null>(null);
	const [container, setContainer] = useState<HTMLDivElement | null>(null);
	const { styles, attributes } = usePopper(props.button, container, {
		placement: "top",
	});

	const list = (
		<HLMenu.Items static className={[sPopover.container, s.list].join(" ")}>
			{props.items.map((item, index) => (
				<MenuItemComponent key={index} item={item} />
			))}
		</HLMenu.Items>
	);

	return (
		<Portal>
			<div
				className={s.container}
				ref={containerRef}
				style={styles.popper}
				{...attributes.popper}
			>
				<Transition
					show={props.open}
					enter={s.enter}
					enterFrom={s.enterFrom}
					enterTo={s.enterTo}
					leave={s.enter}
					leaveFrom={s.enterTo}
					leaveTo={s.enterFrom}
					as={Fragment}
					beforeEnter={() => setContainer(containerRef.current)}
					afterLeave={() => setContainer(null)}
				>
					{list}
				</Transition>
			</div>
		</Portal>
	);
};
