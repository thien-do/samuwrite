import Tippy, { TippyProps } from "@tippyjs/react";
import s from "./tooltip.module.css";

type Props = TippyProps;

const container = (): HTMLElement => {
	const element = document.getElementById("portal");
	if (element === null) throw Error(`#portal is null`);
	return element;
};

const common = (): TippyProps => ({
	className: s.container,

	// https://www.nngroup.com/articles/timing-exposing-content/
	delay: [500, 500],
	duration: [100, 300],
	moveTransition: "transform 500ms var(--ease-out-quint)",

	appendTo: container(),
	trigger: "mouseenter focus",
	arrow: false,
	offset: [0, 8],
});

export const TooltipSource = (
	props: Pick<TippyProps, "singleton">
): JSX.Element => <Tippy {...common} {...props} />;

export const Tooltip = (props: Props): JSX.Element => (
	<Tippy {...common()} {...props} />
);
