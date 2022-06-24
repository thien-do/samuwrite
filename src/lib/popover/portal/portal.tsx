import { Portal as HPortal, Transition } from "@headlessui/react";
import { Fragment, ReactNode, useRef, useState } from "react";
import { usePopper } from "react-popper";
import s from "./portal.module.css";

interface Props {
	open: boolean;
	reference: HTMLElement | null;
	children: ReactNode;
	afterEnter?: () => void;
}

export const PopoverPortal = (props: Props): JSX.Element => {
	// Transition + Portal + Popper is quite complicated. See:
	// https://github.com/tailwindlabs/headlessui/issues/154#issuecomment-742085996
	const containerRef = useRef<HTMLDivElement | null>(null);
	const [container, setContainer] = useState<HTMLDivElement | null>(null);
	const { styles, attributes } = usePopper(props.reference, container, {
		placement: "top",
	});

	return (
		<HPortal>
			<div
				className={s.container}
				ref={containerRef}
				style={styles.popper}
				{...attributes.popper}
			>
				<Transition
					show={props.open}
					enter={s.enter}
					enterFrom={s.hide}
					enterTo={s.show}
					leave={s.leave}
					leaveFrom={s.show}
					leaveTo={s.hide}
					as={Fragment}
					beforeEnter={() => setContainer(containerRef.current)}
					afterEnter={props.afterEnter}
					afterLeave={() => setContainer(null)}
				>
					{props.children}
				</Transition>
			</div>
		</HPortal>
	);
};
