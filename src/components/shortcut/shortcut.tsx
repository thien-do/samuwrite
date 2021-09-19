import { isApple } from "~/src/utils/platform";

export type ShortcutKey =
	| { type: "char"; value: string }
	| { type: "command" }
	| { type: "control" }
	| { type: "shift" }
	| { type: "option" }
	| { type: "command-or-control" };

interface Props {
	keys: ShortcutKey[];
}

const getText = (key: ShortcutKey): string => {
	switch (key.type) {
		case "command":
			return "⌘";
		case "control":
			return "⌃";
		case "option":
			return "⌥";
		case "shift":
			return "⇧";
		case "command-or-control":
			return isApple() ? "⌘" : "⌃";
		default:
			return key.value;
	}
};

// https://github.com/ccampbell/mousetrap/blob/2f9a476ba6158ba69763e4fcf914966cc72ef433/mousetrap.js#L39
// https://github.com/ccampbell/mousetrap/blob/2f9a476ba6158ba69763e4fcf914966cc72ef433/mousetrap.js#L129
export const getMousetrapKey = (key: ShortcutKey): string => {
	switch (key.type) {
		case "control":
			return "ctrl";
		case "option":
			return "alt";
		case "command-or-control":
			return "mod";
		case "command":
		case "shift":
			return key.type;
		default:
			return key.value.toLowerCase();
	}
};

export const toMousetrapKey = (keys: ShortcutKey[]): string => {
	return keys.map(getMousetrapKey).join("+");
};

// const THIN_SPACE = "\u{2009}";
const HAIR_SPACE = "\u{200A}";

export const Shortcut = (props: Props): JSX.Element => (
	<span>{props.keys.map(getText).join(HAIR_SPACE)}</span>
);
