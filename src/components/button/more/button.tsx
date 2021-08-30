import { TippyProps } from "@tippyjs/react";
import { VscChevronDown } from "react-icons/vsc";
import { Popover } from "~/src/components/popover/popover";
import { Tooltip } from "~/src/components/tooltip/tooltip";
import s from "../button.module.css";
import { ButtonMoreMenu, ButtonMoreMenuItem } from "./menu";

interface Props {
	tooltipSingleton: TippyProps["singleton"];
	items: ButtonMoreMenuItem[];
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
