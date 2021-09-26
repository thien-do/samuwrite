import { Select } from "~src/select/select";
import { Slider } from "~src/slider/slider";
import { SizeName, SIZE_NAMES } from "../../size/size";
import { PrefsState } from "../../state";
import s from "./size.module.css";

interface Props {
	prefs: PrefsState;
}

export const SizePref = (props: Props): JSX.Element => (
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

		<Slider
			min={0}
			max={SIZE_NAMES.length - 1}
			value={SIZE_NAMES.indexOf(props.prefs.size)}
			setValue={(index) => {
				const size = SIZE_NAMES[index];
				props.prefs.setSize(size);
			}}
		/>
	</div>
);
