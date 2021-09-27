import { useSingleton } from "@tippyjs/react";
import { TooltipSource } from "~src/tooltip/tooltip";
import { CompatBrowser, CompatBrowserLink } from "./browser/browser";
import s from "./compat.module.css";
import Brave from "./icons/brave.svg";
import Chrome from "./icons/chrome.svg";
import Edge from "./icons/edge.svg";
import Opera from "./icons/opera.svg";

const BROWSERS: CompatBrowser[] = [
	{ Icon: Brave, name: "Brave", link: "https://brave.com" },
	{ Icon: Chrome, name: "Chrome", link: "https://www.google.com/chrome" },
	{ Icon: Edge, name: "Edge", link: "https://www.microsoft.com/edge" },
	{ Icon: Opera, name: "Opera", link: "https://www.opera.com" },
];

export const Compat = (): JSX.Element => {
	const [source, target] = useSingleton();
	return (
		<div className={s.container}>
			<p>
				Your browser{" "}
				<a
					href="https://caniuse.com/native-filesystem-api"
					rel="noreferrer"
					target="_blank"
				>
					cannot
				</a>{" "}
				save over existing files. It will download documents as new files on
				&quot;save&quot;.
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
