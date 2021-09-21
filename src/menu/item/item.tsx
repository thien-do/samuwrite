import { Menu } from "@headlessui/react";
import { ButtonHTMLAttributes } from "react";
import { Shortcut } from "~src/shortcut/shortcut";
import s from "./item.module.css";

interface MenuAction {
	label: string;
	action: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
	shortcut?: string;
}

export type MenuItem = { type: "divider" } | ({ type: "action" } & MenuAction);

interface Props {
	item: MenuItem;
}

const actionRender =
	(item: MenuAction) =>
	({ active }: { active: boolean }): JSX.Element =>
		(
			<button
				className={[s.button, active ? s.active : ""].join(" ")}
				onClick={item.action}
			>
				<span className={s.label}>{item.label}</span>
				{item.shortcut && <Shortcut keys={item.shortcut} />}
			</button>
		);

export const MenuItemComponent = (props: Props): JSX.Element => {
	const { item } = props;
	switch (item.type) {
		case "divider":
			return <hr className={s.hr} />;
		case "action":
			return <Menu.Item>{actionRender(item)}</Menu.Item>;
	}
};
