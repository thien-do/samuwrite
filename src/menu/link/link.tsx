import { Menu } from "@headlessui/react";
import s from "../action/action.module.css";
import { MenuLink as MenuLinkType } from "../item/interface";

interface Props {
	link: MenuLinkType;
}

export const MenuLink = ({ link }: Props): JSX.Element => (
	<Menu.Item>
		{({ active }) => (
			<a
				href={link.url}
				className={[s.button, active ? s.focus : ""].join(" ")}
				target={link.target}
			>
				<span className={s.label}>{link.label}</span>
			</a>
		)}
	</Menu.Item>
);
