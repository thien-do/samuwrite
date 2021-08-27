import { TippyProps } from "@tippyjs/react";
import { ButtonHTMLAttributes, useState } from "react";
import { IconType } from "react-icons";
import { VscChevronDown } from "react-icons/vsc";
import { Popover } from "../popover/popover";
import { Shortcut, ShortcutKey } from "../shortcut/shortcut";
import { Tooltip } from "../tooltip/tooltip";
import s from "./button.module.css";
import { ButtonMoreMenu, ButtonMoreMenuItem } from "./more/menu";

interface Props {
	Icon: IconType;
	onClick: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
	shortcut: ShortcutKey[];
	more?: ButtonMoreMenuItem[];
	tooltip: string;
	tooltipSingleton?: TippyProps["singleton"];
}

export const Button = (props: Props): JSX.Element => {
	const [moreMenu, setMoreMenu] = useState(false);

	return (
		<div className={[s.container].join(" ")}>
			<Tooltip content={props.tooltip} singleton={props.tooltipSingleton}>
				<button
					className={[s.button, s.primary].join(" ")}
					onClick={props.onClick}
				>
					<props.Icon size={24} />
					<Shortcut keys={props.shortcut} />
				</button>
			</Tooltip>
			{props.more && (
				<Tooltip content="More" singleton={props.tooltipSingleton}>
					<Popover content={<ButtonMoreMenu items={props.more} />}>
						<button
							className={[s.button, s.moreButton].join(" ")}
							onClick={() => setMoreMenu(!moreMenu)}
						>
							<VscChevronDown size={24} />
						</button>
					</Popover>
				</Tooltip>
			)}
		</div>
	);
};
