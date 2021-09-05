import { PrefsState } from "~src/components/prefs/state";
import { ThemeName, THEME_COLORS } from "../theme";
import s from "./option.module.css";

interface Props {
	name: ThemeName;
	prefs: PrefsState;
}

export const ThemeOption = (props: Props): JSX.Element => {
	const colors = THEME_COLORS[props.name];
	return (
		<button
			className={[
				s.container,
				props.name === props.prefs.theme ? s.selected : "",
			].join(" ")}
			onClick={() => props.prefs.setTheme(props.name)}
			style={{ background: colors.bg.hex() }}
		>
			<span className={s.text} style={{ color: colors.text.hex() }}>
				Aa
			</span>
			<span className={s.caret} style={{ background: colors.caret.hex() }} />
		</button>
	);
};
