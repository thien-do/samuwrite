import { isApple } from "../../utils/platform";

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

export const Shortcut = (props: Props) => (
	<span>{props.keys.map(getText).join("")}</span>
);
