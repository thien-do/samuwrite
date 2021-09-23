import { Popover as HLPopover } from "@headlessui/react";
import { forwardRef, ReactNode, useState } from "react";
import { Button, ButtonProps } from "~src/button/button";
import { Portal } from "~src/portal/portal";
import s from "./popover.module.css";

interface Props {
	open: boolean;
	children: ReactNode;
	button: ButtonProps;
}

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
					</HLPopover.Panel>
				</Portal>
			</HLPopover>
		);
	}
);
