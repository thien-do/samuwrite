import { TippyProps } from "@tippyjs/react";
import { SVGProps } from "react";
import { Tooltip } from "~src/tooltip/tooltip";
import s from "./browser.module.css";

export interface CompatBrowser {
	Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
	name: string;
	link: string;
}

interface Props {
	browser: CompatBrowser;
	tooltip: TippyProps["singleton"];
}

export const CompatBrowserLink = (props: Props): JSX.Element => (
	<Tooltip singleton={props.tooltip} content={props.browser.name}>
		<a
			className={s.link}
			href={props.browser.link}
			target="_blank"
			rel="noreferrer"
		>
			<props.browser.Icon width={32} height={32} viewBox="0 0 48 48" />
		</a>
	</Tooltip>
);
