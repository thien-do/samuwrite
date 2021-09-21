import { ThemePref } from "../../theme/pref/pref";
import { PrefsState } from "../state";
import s from "./panel.module.css";
import { SizePref } from "./size/size";

interface Props {
	prefs: PrefsState;
}

export const PrefsPanel = (props: Props): JSX.Element => (
	<div className={s.container}>
		<SizePref prefs={props.prefs} />
		<ThemePref prefs={props.prefs} />
	</div>
);
