import { TippyProps } from "@tippyjs/react";
import { ButtonHTMLAttributes, forwardRef } from "react";
import { IconType } from "react-icons";
import { VscChevronDown } from "react-icons/vsc";
import { MenuItem } from "~src/menu/item/interface";
import { Menu } from "~src/menu/menu";
import { Shortcut } from "../shortcut/shortcut";
import { Tooltip } from "../tooltip/tooltip";
import s from "./button.module.css";

export interface ButtonProps {
	Icon: IconType;
	onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
	shortcut?: string;
	more?: MenuItem[];
	tooltip?: string;
	tooltipSingleton?: TippyProps["singleton"];
	selected?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(props, ref): JSX.Element => (
		<div className={[s.container].join(" ")}>
			<Tooltip
				disabled={props.tooltip === undefined}
				content={props.tooltip}
				singleton={props.tooltipSingleton}
			>
				<button
					className={[
						s.button,
						s.primary,
						props.selected ? s.selected : "",
					].join(" ")}
					onClick={props.onClick}
					ref={ref}
				>
					<props.Icon size={24} />
					{props.shortcut && <Shortcut keys={props.shortcut} />}
				</button>
			</Tooltip>
			{props.more && (
				<div className={s.more}>
					{/* @TODO: Try to show Tooltip in an unobstructive way */}
					<Menu items={props.more} button={{ Icon: VscChevronDown }} />
				</div>
			)}
		</div>
	)
);
