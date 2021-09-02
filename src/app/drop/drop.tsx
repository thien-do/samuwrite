import s from "./drop.module.css";

export const AppDrop = (): JSX.Element => (
	<div className={s.container}>
		<p className={s.body}>Drop file here to open</p>
	</div>
);
