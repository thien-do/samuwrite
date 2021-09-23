import { MenuAction } from "../action/action";
import { MenuHeading } from "../heading/heading";
import { MenuGroup as MenuGroupType } from "../item/interface";
import s from "./group.module.css";

interface Props {
	group: MenuGroupType;
}

export const MenuGroup = ({ group }: Props): JSX.Element => (
	<div className={s.container}>
		<MenuHeading heading={group.heading} />
		<div className={s.items}>
			{group.actions.map((action, index) => (
				<div className={s.item} key={index}>
					<MenuAction action={action} />
				</div>
			))}
		</div>
	</div>
);
