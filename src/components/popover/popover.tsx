import { TippyProps } from "@tippyjs/react";
import { forwardRef } from "react";
import { LazyTippy } from "./lazy";

type Props = TippyProps;

const container = document.getElementById("portal");
if (container === null) throw Error(`#portal is null`);

export const Popover = forwardRef<Element, Props>(
	(props, ref): JSX.Element => (
		<LazyTippy
			arrow={false}
			duration={100}
			offset={[0, 8]}
			appendTo={container}
			ref={ref}
			delay={0}
			trigger={props.visible === undefined ? "click" : undefined}
			interactive
			className="tippy-no-padding"
			{...props}
		/>
	)
);
