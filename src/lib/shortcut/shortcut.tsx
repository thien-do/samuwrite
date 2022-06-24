import { isApple } from "~/src/lib/utils/platform";
import { HAIR_SPACE } from "~/src/lib/utils/typography";

interface Props {
  keys: string;
}

const getText = (key: string): string => {
  switch (key) {
    case "command":
    case "meta":
      return "⌘";
    case "ctrl":
      return "⌃";
    case "alt":
    case "option":
      return "⌥";
    case "shift":
      return "⇧";
    case "mod":
      return isApple() ? "⌘" : "⌃";
    default:
      return key.toUpperCase();
  }
};

export const ShortcutText = (props: Props): JSX.Element => (
  <span>{props.keys.split("+").map(getText).join(HAIR_SPACE)}</span>
);
