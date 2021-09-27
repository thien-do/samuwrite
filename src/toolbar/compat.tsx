import { TippyProps } from "@tippyjs/react";
import { VscBug, VscIssues, VscWarning } from "react-icons/vsc";
import { SHORTCUTS } from "~src/toolbar/shortcuts";
import { Tooltip } from "~src/tooltip/tooltip";
import { Compat } from "~src/compat/compat";
import { Popover } from "../popover/popover";
import { supported } from "browser-fs-access";

interface Props {
	singleton: TippyProps["singleton"];
}

export const ToolbarCompat = (props: Props): JSX.Element | null => {
	if (!supported) return null;
	return (
		<Tooltip content="Compatible issue…" singleton={props.singleton}>
			<Popover
				button={{ Icon: VscIssues, shortcut: SHORTCUTS.compat, error: true }}
				shortcut={SHORTCUTS.compat}
			>
				<Compat />
			</Popover>
		</Tooltip>
	);
};
