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
				fill
				autoFocus
			/>
			<input
				type="range"
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
