import { useSingleton } from "@tippyjs/react";
import { TooltipSource } from "~src/tooltip/tooltip";
import Brave from "./brave.svg";
import { CompatBrowser, CompatBrowserLink } from "./browser/browser";
import Chrome from "./chrome.svg";
import s from "./compat.module.css";
import Edge from "./edge.svg";
import Opera from "./opera.svg";

const BROWSERS: CompatBrowser[] = [
	{ Icon: Brave, name: "Brave", link: "https://brave.com" },
	{ Icon: Chrome, name: "Chrome", link: "https://www.google.com/chrome" },
	{ Icon: Edge, name: "Edge", link: "https://www.microsoft.com/edge" },
	{ Icon: Opera, name: "Opera", link: "https://www.opera.com" },
];

// https://caniuse.com/native-filesystem-api

export const Compat = (): JSX.Element => {
	const [source, target] = useSingleton();
	return (
		<div className={s.container}>
			<p>
				Your browser cannot save over existing files. It will download documents
				as new files on &quot;save&quot;.
			</p>
			<p>To save over existing files, use one of the supported browsers:</p>
			<div className={s.browsers}>
				<TooltipSource singleton={source} />
				{BROWSERS.map((browser) => (
					<CompatBrowserLink
						key={browser.name}
						browser={browser}
						tooltip={target}
					/>
				))}
			</div>
		</div>
	);
};
