import { ButtonHTMLAttributes } from "react";
import { IconType } from "react-icons";
import { VscChevronDown } from "react-icons/vsc";
import { Shortcut, ShortcutKey } from "../shortcut/shortcut";
import s from "./button.module.css";

interface MoreItem {
	label: string;
	action: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
	shortcut: ShortcutKey[];
}

interface Props {
	Icon: IconType;
	onClick: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
	shortcut: ShortcutKey[];
	more?: MoreItem[];
}

export const Button = (props: Props): JSX.Element => (
	<div className={[s.container].join(" ")}>
		<button className={[s.button, s.primary].join(" ")} onClick={props.onClick}>
			<props.Icon size={24} />
			<Shortcut keys={props.shortcut} />
		</button>
		{props.more && (
			<button className={[s.button, s.more].join(" ")}>
				<VscChevronDown size={24} />
			</button>
		)}
	</div>
);
