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
				{({ open }) => (
					<>
						<div ref={setReference}>
							<HLPopover.Button
								ref={ref}
								as={Button}
								selected={open}
								{...props.button}
							/>
						</div>
						<Portal open={open} reference={reference}>
							<HLPopover.Panel className={s.container}>
								{props.children}
							</HLPopover.Panel>
						</Portal>
					</>
				)}
			</HLPopover>
		);
	}
);
