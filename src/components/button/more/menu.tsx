import { ButtonHTMLAttributes } from "react";
import { Shortcut } from "~/src/components/shortcut/shortcut";
import s from "./menu.module.css";

const container = document.getElementById("portal");
if (container === null) throw Error(`#portal is null`);

interface ButtonMoreAction {
	label: string;
	action: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
	shortcut?: string;
}

export type ButtonMoreItem = ButtonMoreAction | "divider";

interface Props {
	items: ButtonMoreItem[];
}

export const ButtonMoreMenu = (props: Props): JSX.Element => (
	<div className={s.menu}>
		{props.items.map((item, index) =>
			item === "divider" ? (
				<hr key={index} className={s.hr} />
			) : (
				<button className={s.item} key={item.label} onClick={item.action}>
					<span className={s.label}>{item.label}</span>
					{item.shortcut && <Shortcut keys={item.shortcut} />}
				</button>
			)
		)}
	</div>
);
