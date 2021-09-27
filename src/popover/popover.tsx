import { Popover as HLPopover } from "@headlessui/react";
import { ForwardedRef, forwardRef, ReactNode, useState } from "react";
import { Button, ButtonProps } from "~src/button/button";
import { Key } from "~src/key/key";
import { MenuDivider } from "~src/menu/divider/divider";
import { MenuHelp } from "~src/menu/help/help";
import s from "./popover.module.css";
import { PopoverPortal } from "./portal/portal";
import { PopoverShortcut } from "./shortcut/shortcut";

interface Props {
	children: ReactNode;
	button: ButtonProps;
	shortcut?: string;
	afterEnter?: () => void;
}

interface BodyProps extends Props {
	buttonRef: ForwardedRef<HTMLButtonElement>;
	open: boolean;
}

const Help = (): JSX.Element => (
	<div>
		<Key>⇥</Key>
		<span> to navigate, </span>
		<Key>↵</Key>
		<span> to select</span>
	</div>
);

const Body = (props: BodyProps): JSX.Element => {
	const [reference, setReference] = useState<HTMLDivElement | null>(null);
	return (
		<>
			{props.shortcut !== undefined && (
				<PopoverShortcut keys={props.shortcut} reference={reference} />
			)}
			<div ref={setReference}>
				<HLPopover.Button
					ref={props.buttonRef}
					as={Button}
					selected={props.open}
					{...props.button}
				/>
			</div>
			<PopoverPortal
				open={props.open}
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
		</>
	);
};

export const Popover = forwardRef<HTMLButtonElement, Props>(
	(props, buttonRef): JSX.Element => (
		<HLPopover>
			{({ open }) => <Body {...props} buttonRef={buttonRef} open={open} />}
		</HLPopover>
	)
);
