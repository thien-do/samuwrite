import { Popover as HLPopover } from "@headlessui/react";
import { ReactNode, useState } from "react";
import { Button, ButtonProps } from "~src/button/button";
import { Portal } from "~src/portal/portal";
import s from "./popover.module.css";

interface Props {
	open: boolean;
	children: ReactNode;
	button: ButtonProps;
}

export const Popover = (props: Props): JSX.Element => {
	const [button, setButton] = useState<HTMLButtonElement | null>(null);
	return (
		<HLPopover>
			{({ open }) => (
				<>
					<HLPopover.Button
						ref={setButton}
						as={Button}
						selected={open}
						{...props.button}
					/>
					<Portal open={open} referenceElement={button}>
						<HLPopover.Panel className={s.container}>
							{props.children}
						</HLPopover.Panel>
					</Portal>
				</>
			)}
		</HLPopover>
	);
};
