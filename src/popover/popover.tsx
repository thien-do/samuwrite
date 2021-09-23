import { Popover as HLPopover } from "@headlessui/react";
import { forwardRef, ReactNode, useState } from "react";
import { Button, ButtonProps } from "~src/button/button";
import { Key } from "~src/key/key";
import { MenuDivider } from "~src/menu/divider/divider";
import { MenuHelp } from "~src/menu/help/help";
import s from "./popover.module.css";
import { PopoverPortal } from "./portal/portal";
import { PopoverShortcut } from "./shortcut";

interface Props {
	children: ReactNode;
	button: ButtonProps;
	shortcut?: string;
	afterEnter?: () => void;
}

const Help = (): JSX.Element => (
	<div>
		<Key>⇥</Key>
		<span> to navigate, </span>
		<Key>↵</Key>
		<span> to select, </span>
		<Key>esc</Key>
		<span> to close</span>
	</div>
);

export const Popover = forwardRef<HTMLButtonElement, Props>(
	(props, ref): JSX.Element => {
		const [reference, setReference] = useState<HTMLElement | null>(null);

		const button = (open: boolean) => (
			<div ref={setReference}>
				{props.shortcut !== undefined && (
					<PopoverShortcut keys={props.shortcut} reference={reference} />
				)}
				<HLPopover.Button
					ref={ref}
					as={Button}
					selected={open}
					{...props.button}
				/>
			</div>
		);

		const panel = (open: boolean) => (
			<PopoverPortal
				open={open}
				reference={reference}
				afterEnter={props.afterEnter}
			>
				<HLPopover.Panel className={s.container}>
					{props.children}
					<div className={s.help}>
						<MenuDivider />
						<MenuHelp help={{ content: <Help /> }} />
					</div>
				</HLPopover.Panel>
			</PopoverPortal>
		);

		return (
			<HLPopover>
				{({ open }) => (
					<>
						{button(open)}
						{panel(open)}
					</>
				)}
			</HLPopover>
		);
	}
);
