import { PrefsState } from "~src/components/prefs/state";
import { ThemeOption } from "../option/option";
import { THEME_NAMES } from "../theme";
import s from "./pref.module.css";

interface Props {
	prefs: PrefsState;
}

/**
 * The area to set theme in prefs panel
 */
export const ThemePref = (props: Props): JSX.Element => (
	<div className={s.container}>
		{THEME_NAMES.map((name) => (
			<div key={name}>
				<ThemeOption name={name} prefs={props.prefs} />
			</div>
		))}
	</div>
);
