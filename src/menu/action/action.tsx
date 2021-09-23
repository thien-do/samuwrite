import { Shortcut } from "~src/shortcut/shortcut";
import { MenuAction as MenuActionType } from "../item/interface";
import { Menu } from "@headlessui/react";
import s from "./action.module.css";

interface Props {
	action: MenuActionType;
}

export const MenuAction = ({ action }: Props): JSX.Element => (
	<Menu.Item>
		{({ active }) => (
			<button
				className={[
					s.button,
					active ? s.focus : "",
					action.active ? s.active : "",
				].join(" ")}
				onClick={action.action}
			>
				<span className={s.label}>{action.label}</span>
				{action.shortcut && (
					<span className={s.shortcut}>
						<Shortcut keys={action.shortcut} />
					</span>
				)}
			</button>
		)}
	</Menu.Item>
);
