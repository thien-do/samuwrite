import { ButtonHTMLAttributes } from "react";
import { createPortal } from "react-dom";
import { Shortcut, ShortcutKey } from "../../shortcut/shortcut";
import s from "./menu.module.css";

const container = document.getElementById("portal");
if (container === null) throw Error(`#portal is null`);

export interface ButtonMoreMenuItem {
	label: string;
	action: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
	shortcut: ShortcutKey[];
}

interface Props {
	items: ButtonMoreMenuItem[];
}

export const ButtonMoreMenu = (props: Props): JSX.Element => (
	<div className={s.menu}>
		{props.items.map((item) => (
			<button className={s.item} key={item.label} onClick={item.action}>
				{item.label}
				<Shortcut keys={item.shortcut} />
			</button>
		))}
	</div>
);
