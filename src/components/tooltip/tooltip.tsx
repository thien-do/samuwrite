import Tippy, { TippyProps } from "@tippyjs/react";

interface Props extends TippyProps {
	content: string;
}

const container = document.getElementById("portal");
if (container === null) throw Error(`#portal is null`);

export const Tooltip = (props: Props): JSX.Element => (
	<Tippy arrow={false} offset={[0, 8]} appendTo={container} {...props} />
);
