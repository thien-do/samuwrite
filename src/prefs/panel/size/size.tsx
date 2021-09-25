import { Select } from "~src/select/select";
import { SizeName, SIZE_NAMES } from "../../size/size";
import { PrefsState } from "../../state";
import s from "./size.module.css";

interface Props {
	prefs: PrefsState;
}

export const SizePref = (props: Props): JSX.Element => {
	return (
		<div className={s.container}>
			<Select<string>
				value={props.prefs.size}
				setValue={(value) => props.prefs.setSize(value as SizeName)}
				options={SIZE_NAMES.map((size) => ({
					id: size,
					label: size,
					value: size,
				}))}
				// Don't use auto focus here as it will prevent the "enter"
				// transition of prefs panel. Instead, set the focus in
				// "afterEnter"
			/>

			<input
				type="range"
				className={s.slider}
				min={0}
				max={SIZE_NAMES.length - 1}
				value={SIZE_NAMES.indexOf(props.prefs.size)}
				onChange={(event) => {
					const size = SIZE_NAMES[event.target.valueAsNumber];
					props.prefs.setSize(size);
				}}
			/>
		</div>
	);
};
