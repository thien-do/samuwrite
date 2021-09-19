import { isApple } from "~/src/utils/platform";

interface Props {
	keys: string;
}

const getText = (key: string): string => {
	switch (key) {
		case "command":
			return "⌘";
		case "ctrl":
			return "⌃";
		case "alt":
			return "⌥";
		case "shift":
			return "⇧";
		case "mod":
			return isApple() ? "⌘" : "⌃";
		default:
			return key.toUpperCase();
	}
};

// const THIN_SPACE = "\u{2009}";
const HAIR_SPACE = "\u{200A}";

export const Shortcut = (props: Props): JSX.Element => (
	<span>{props.keys.split("+").map(getText).join(HAIR_SPACE)}</span>
);
