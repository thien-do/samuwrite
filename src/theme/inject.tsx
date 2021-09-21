import Color from "color";
import { ThemeColors, ThemeDetail, ThemeName, THEME_DETAILS } from "./theme";

interface Props {
	theme: ThemeName;
}

const getOthers = ({ scheme }: ThemeDetail): string => `
--shadow-opacity: ${scheme === "light" ? "0.05" : "0.2"};
--border-inset: 0 0 0 1px ${scheme === "light" ? "white inset" : "black"};
`;

const getColors = ({ colors }: ThemeDetail): string => {
	const variables: string[] = [];
	Object.keys(colors).forEach((key) => {
		const color = colors[key as keyof ThemeColors] as Color;
		variables.push(`--${key}-color: ${color.hex()};`);
		const rgb = `${color.red()}, ${color.green()}, ${color.blue()}`;
		variables.push(`--${key}-color-rgb: ${rgb};`);
	});
	return variables.join("\n");
};

const getCss = (name: ThemeName): string => {
	const detail = THEME_DETAILS[name];
	return `:root {
		${getColors(detail)}
		${getOthers(detail)}
	}`;
};

export const ThemeInject = (props: Props): JSX.Element => (
	<style>{getCss(props.theme)}</style>
);
