import { PrefsState } from "./state";
import { Theme, THEMES } from "./theme/state";

interface Props {
	prefs: PrefsState;
}

export const Prefs = (props: Props): JSX.Element => (
	<div>
		<select
			value={props.prefs.theme}
			onChange={(event) => {
				props.prefs.setTheme(event.target.value as Theme);
			}}
		>
			{THEMES.map((theme) => (
				<option key={theme} value={theme}>
					{theme}
				</option>
			))}
		</select>
	</div>
);
