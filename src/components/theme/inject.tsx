import Color from "color";
import { ThemeColors, ThemeName, THEME_DETAILS } from "./theme";

interface Props {
	theme: ThemeName;
}

const getCss = (theme: ThemeName): string => {
	const variables: string[] = [];
	const colors = THEME_DETAILS[theme].colors;
	Object.keys(colors).forEach((key) => {
		const color = colors[key as keyof ThemeColors] as Color;
		variables.push(`--${key}-color: ${color.hex()};`);
		const rgb = `${color.red()}, ${color.green()}, ${color.blue()}`;
		variables.push(`--${key}-color-rgb: ${rgb};`);
	});
	return [":root {", variables.join("\n"), "}"].join("\n");
};

export const ThemeInject = (props: Props): JSX.Element => (
	<style>{getCss(props.theme)}</style>
);
