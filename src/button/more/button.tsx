import { TippyProps } from "@tippyjs/react";
import { VscChevronDown } from "react-icons/vsc";
import { Popover } from "~src/popover/popover";
import { Tooltip } from "~src/tooltip/tooltip";
import s from "../button.module.css";
import { ButtonMoreMenu, ButtonMoreItem } from "./menu";

interface Props {
	tooltipSingleton: TippyProps["singleton"];
	items: ButtonMoreItem[];
}

export const ButtonMoreButton = (props: Props): JSX.Element => (
	<Tooltip content="More" singleton={props.tooltipSingleton}>
		<Popover content={<ButtonMoreMenu items={props.items} />}>
			<button className={[s.button, s.moreButton].join(" ")}>
				<VscChevronDown size={24} />
			</button>
		</Popover>
	</Tooltip>
);
