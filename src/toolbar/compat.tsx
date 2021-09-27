import { TippyProps } from "@tippyjs/react";
import { supported } from "browser-fs-access";
import { VscIssues } from "react-icons/vsc";
import { Compat } from "~src/compat/compat";
import { SHORTCUTS } from "~src/toolbar/shortcuts";
import { Tooltip } from "~src/tooltip/tooltip";
import { Popover } from "../popover/popover";

interface Props {
	singleton: TippyProps["singleton"];
}

export const ToolbarCompat = (props: Props): JSX.Element | null => {
	if (supported) return null;
	return (
		<Tooltip content="Compatible issue…" singleton={props.singleton}>
			<Popover
				button={{ Icon: VscIssues, shortcut: SHORTCUTS.compat }}
				shortcut={SHORTCUTS.compat}
			>
				<Compat />
			</Popover>
		</Tooltip>
	);
};
