import Tippy, { TippyProps } from "@tippyjs/react";
import { forwardRef } from "react";
import "./tooltip.css";

type Props = TippyProps;

const container = document.getElementById("portal");
if (container === null) throw Error(`#portal is null`);

export const TooltipSource = (
	props: Pick<TippyProps, "singleton" | "delay">
): JSX.Element => <Tippy {...props} />;

export const Tooltip = forwardRef<Element, Props>(
	(props, ref): JSX.Element => (
		<Tippy
			arrow={false}
			delay={[500, 0]}
			duration={100}
			offset={[0, 8]}
			appendTo={container}
			ref={ref}
			{...props}
		/>
	)
);
