import { ButtonHTMLAttributes } from "react";
import { Shortcut } from "~/src/components/shortcut/shortcut";
import s from "./menu.module.css";

const container = document.getElementById("portal");
if (container === null) throw Error(`#portal is null`);

export interface ButtonMoreMenuItem {
	label: string;
	action: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
	shortcut: string;
}

interface Props {
	items: ButtonMoreMenuItem[];
}

export const ButtonMoreMenu = (props: Props): JSX.Element => (
	<div className={s.menu}>
		{props.items.map((item) => (
			<button className={s.item} key={item.label} onClick={item.action}>
				<span className={s.label}>{item.label}</span>
				<Shortcut keys={item.shortcut} />
			</button>
		))}
	</div>
);
