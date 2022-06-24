import { MenuHelp as MenuHelpType } from "../item/interface";
import s from "./help.module.css";

interface Props {
	help: MenuHelpType;
}

export const MenuHelp = ({ help }: Props): JSX.Element => (
	<div className={s.help}>{help.content}</div>
);
