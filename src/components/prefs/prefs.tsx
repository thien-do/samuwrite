import { SizeName, SIZE_NAMES } from "./size/size";
import { PrefsState } from "./state";
import { ThemeName, THEME_NAMES } from "./theme/theme";

interface Props {
	prefs: PrefsState;
}

export const Prefs = (props: Props): JSX.Element => (
	<div>
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
		<select
			value={props.prefs.theme}
			onChange={(event) => {
				props.prefs.setTheme(event.target.value as ThemeName);
			}}
		>
			{THEME_NAMES.map((theme) => (
				<option key={theme} value={theme}>
					{theme}
				</option>
			))}
		</select>
	</div>
);
