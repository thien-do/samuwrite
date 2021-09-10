import { SizeName, SIZE_NAMES } from "../../size/size";
import { PrefsState } from "../../state";
import s from "./size.module.css";

interface Props {
	prefs: PrefsState;
}

export const SizePref = (props: Props): JSX.Element => {
	return (
		<div className={s.container}>
			<div className={s.label}>Editor size</div>
			<label className={s.select}>
				<select
					className={s.selectElement}
					value={props.prefs.size}
					onChange={(event) => {
						props.prefs.setSize(event.target.value as SizeName);
					}}
				>
					{SIZE_NAMES.map((size) => (
						<option key={size} value={size}>
							{size}
						</option>
					))}
				</select>
			</label>
		</div>
	);
};
