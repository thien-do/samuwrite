import { ThemePref } from "../../theme/pref/pref";
import { SizeName, SIZE_NAMES } from "../size/size";
import { PrefsState } from "../state";
import s from "./panel.module.css";

interface Props {
	prefs: PrefsState;
}

export const PrefsPanel = (props: Props): JSX.Element => (
	<div className={s.container}>
		<select
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
		<ThemePref prefs={props.prefs} />
	</div>
);
