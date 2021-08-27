import { TippyProps } from "@tippyjs/react";
import { forwardRef } from "react";
import { Tooltip } from "../tooltip/tooltip";

interface Props extends TippyProps {}

export const Popover = forwardRef<Element, Props>(
	(props, ref): JSX.Element => (
		<Tooltip delay={0} trigger="click" interactive ref={ref} {...props} />
	)
);
