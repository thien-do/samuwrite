import { HTMLAttributes } from "react";
import s from "./slider.module.css";

interface Props {
	min: number;
	max: number;
	value: number;
	setValue: (value: number) => void;
	native?: HTMLAttributes<HTMLInputElement>;
}

export const Slider = (props: Props): JSX.Element => (
	<input
		{...props.native}
		type="range"
		className={s.slider}
		min={props.min}
		max={props.max}
		value={props.value}
		onChange={(event) => {
			props.setValue(event.target.valueAsNumber);
		}}
	/>
);
