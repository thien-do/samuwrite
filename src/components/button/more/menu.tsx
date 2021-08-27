import { ButtonHTMLAttributes } from "react";
import { createPortal } from "react-dom";
// import { usePopper } from "react-popper";
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
	setMenu: (element: HTMLDivElement) => void;
	items: ButtonMoreMenuItem[];
	// popper: ReturnType<typeof usePopper>;
}

export const ButtonMoreMenu = (props: Props): JSX.Element =>
	createPortal(
		<div ref={props.setMenu} className={s.menu}>
			{props.items.map((item) => (
				<button className={s.item} key={item.label} onClick={item.action}>
					{item.label}
					<Shortcut keys={item.shortcut} />
				</button>
			))}
		</div>,
		container
	);
