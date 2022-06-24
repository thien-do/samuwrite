import s from "./key.module.css";

interface Props {
	children: string;
}

export const Key = (props: Props): JSX.Element => (
	<span className={s.key}>{props.children}</span>
);
