import Tippy, { TippyProps } from "@tippyjs/react";
import "./tooltip.css";

type Props = TippyProps;

const container = document.getElementById("portal");
if (container === null) throw Error(`#portal is null`);

const common: TippyProps = {
	// https://www.nngroup.com/articles/timing-exposing-content/
	delay: [500, 500],
	duration: [100, 300],
	moveTransition: "transform 500ms var(--ease-out-quint)",

	appendTo: container,
	trigger: "mouseenter focus focusin",
	arrow: false,
	offset: [0, 8],
};

export const TooltipSource = (
	props: Pick<TippyProps, "singleton">
): JSX.Element => <Tippy {...common} {...props} />;

export const Tooltip = (props: Props): JSX.Element => (
	<Tippy {...common} {...props} />
);
