import { Popover as HLPopover } from "@headlessui/react";
import { forwardRef, ReactNode, useState } from "react";
import { Button, ButtonProps } from "~src/button/button";
import { Key } from "~src/key/key";
import { MenuDivider } from "~src/menu/divider/divider";
import { MenuHelp } from "~src/menu/help/help";
import { Portal } from "~src/portal/portal";
import s from "./popover.module.css";

interface Props {
	open: boolean;
	children: ReactNode;
	button: ButtonProps;
}

const Help = (): JSX.Element => (
	<div>
		<Key>⇥</Key>
		<span> to navigate, </span>
		<Key>↵</Key>
		<span> to select</span>
	</div>
);

export const Popover = forwardRef<HTMLButtonElement, Props>(
	(props, ref): JSX.Element => {
		const [reference, setReference] = useState<HTMLElement | null>(null);
		return (
			<HLPopover>
				<div ref={setReference}>
					<Button ref={ref} selected={props.open} {...props.button} />
				</div>
				<Portal open={props.open} reference={reference}>
					<HLPopover.Panel static className={s.container}>
						{props.children}
						<div className={s.help}>
							<MenuDivider />
							<MenuHelp help={{ content: <Help /> }} />
						</div>
					</HLPopover.Panel>
				</Portal>
			</HLPopover>
		);
	}
);
