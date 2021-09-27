import { IconType } from "react-icons";
import Brave from "./brave.svg";
import Chrome from "./chrome.svg";
import Edge from "./edge.svg";
import Opera from "./opera.svg";
import s from "./compat.module.css";
import { Tooltip, TooltipSource } from "~src/tooltip/tooltip";
import { useSingleton } from "@tippyjs/react";

interface Browser {
	Icon: IconType;
	name: string;
	link: string;
}

const BROWSERS: Browser[] = [
	{ Icon: Brave, name: "Brave", link: "https://brave.com" },
	{ Icon: Chrome, name: "Chrome", link: "https://www.google.com/chrome" },
	{ Icon: Edge, name: "Edge", link: "https://www.microsoft.com/edge" },
	{ Icon: Opera, name: "Opera", link: "https://www.opera.com" },
];

export const Compat = (): JSX.Element => {
	const [source, target] = useSingleton();
	return (
		<div className={s.browsers}>
			<TooltipSource singleton={source} />
			{BROWSERS.map((browser) => (
				<div className={s.browser} key={browser.name}>
					<Tooltip singleton={target} content={browser.name}>
						<a href={browser.link} target="_blank" rel="noreferrer">
							<browser.Icon width={40} height={40} viewBox="0 0 48 48" />
						</a>
					</Tooltip>
				</div>
			))}
		</div>
	);
};
