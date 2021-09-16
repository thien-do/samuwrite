import { Select } from "~src/components/select/select";
import { SizeName, SIZE_NAMES } from "../../size/size";
import { PrefsState } from "../../state";
import s from "./size.module.css";

interface Props {
	prefs: PrefsState;
}

export const SizePref = (props: Props): JSX.Element => {
	return (
		<div className={s.container}>
			<label className={s.label}>
				<span className={s.labelText}>Editor size</span>
				<div className={s.select}>
					<Select<string>
						value={props.prefs.size}
						setValue={(value) => props.prefs.setSize(value as SizeName)}
						options={SIZE_NAMES.map((size) => ({
							id: size,
							label: size,
							value: size,
						}))}
						fill
					/>
				</div>
			</label>
		</div>
	);
};
