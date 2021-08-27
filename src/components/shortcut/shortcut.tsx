import { isApple } from "../../utils/platform";

export type ShortcutKey =
	| string
	| "command"
	| "control"
	| "shift"
	| "option"
	| "command-or-control";

interface Props {
	keys: ShortcutKey[];
}

const getText = (key: ShortcutKey): string => {
	switch (key) {
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
			return key;
	}
};

export const Shortcut = (props: Props) => (
	<span>{props.keys.map(getText).join("")}</span>
);
