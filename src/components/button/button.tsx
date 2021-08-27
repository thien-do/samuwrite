import { ButtonHTMLAttributes } from "react";
import { IconType } from "react-icons";
import { Shortcut, ShortcutKey } from "../shortcut/shortcut";
import s from "./button.module.css";

interface Props {
	Icon: IconType;
	onClick: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
	shortcut: ShortcutKey[];
}

export const Button = (props: Props): JSX.Element => (
	<button className={s.button} onClick={props.onClick}>
		<props.Icon />
		<Shortcut keys={props.shortcut} />
	</button>
);
