import Tippy, { TippyProps } from "@tippyjs/react";

interface Props extends TippyProps {
	content: string;
}

const container = document.getElementById("portal");
if (container === null) throw Error(`#portal is null`);

export const TooltipSource = (
	props: Pick<TippyProps, "singleton" | "delay">
): JSX.Element => <Tippy {...props} />;

export const Tooltip = (props: Props): JSX.Element => (
	<Tippy
		arrow={false}
		delay={[300, 0]}
		duration={100}
		offset={[0, 8]}
		appendTo={container}
		{...props}
	/>
);
