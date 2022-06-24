import { MenuHeading as MenuHeadingType } from "../item/interface";
import s from "./heading.module.css";

interface Props {
	heading: MenuHeadingType;
}

export const MenuHeading = ({ heading }: Props): JSX.Element => (
	<div className={s.heading}>{heading.text}</div>
);
