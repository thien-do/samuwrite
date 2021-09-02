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

// const THIN_SPACE = "\u{2009}";
const HAIR_SPACE = "\u{200A}";

export const Shortcut = (props: Props): JSX.Element => (
	<span>{props.keys.map(getText).join(HAIR_SPACE)}</span>
);
