import { ButtonHTMLAttributes, Fragment } from "react";
import { Shortcut } from "~src/shortcut/shortcut";
import s from "./menu.module.css";

const container = document.getElementById("portal");
if (container === null) throw Error(`#portal is null`);

interface ButtonMoreAction {
	label: string;
	action: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
	shortcut?: string;
}

export type ButtonMoreItem =
	| { type: "divider" }
	| ({ type: "action" } & ButtonMoreAction)
	| { type: "custom"; content: JSX.Element };

interface Props {
	items: ButtonMoreItem[];
}

export const ButtonMoreMenu = (props: Props): JSX.Element => (
	<div className={s.menu}>
		{props.items.map((item, index) =>
			item.type === "divider" ? (
				<hr key={index} className={s.hr} />
			) : item.type === "action" ? (
				<button className={s.item} key={item.label} onClick={item.action}>
					<span className={s.label}>{item.label}</span>
					{item.shortcut && <Shortcut keys={item.shortcut} />}
				</button>
			) : (
				<Fragment key={index}>{item.content}</Fragment>
			)
		)}
	</div>
);
