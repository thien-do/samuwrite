import { TippyProps } from "@tippyjs/react";
import { ButtonHTMLAttributes, forwardRef } from "react";
import { IconType } from "react-icons";
import { Shortcut, ShortcutKey } from "../shortcut/shortcut";
import { Tooltip } from "../tooltip/tooltip";
import s from "./button.module.css";
import { ButtonMoreButton } from "./more/button";
import { ButtonMoreMenuItem } from "./more/menu";

interface Props {
	Icon: IconType;
	onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
	shortcut: ShortcutKey[];
	more?: ButtonMoreMenuItem[];
	tooltip: string;
	tooltipSingleton?: TippyProps["singleton"];
	selected?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, Props>(
	(props, ref): JSX.Element => (
		<div className={[s.container].join(" ")}>
			<Tooltip content={props.tooltip} singleton={props.tooltipSingleton}>
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
					<Shortcut keys={props.shortcut} />
				</button>
			</Tooltip>
			{props.more && (
				<ButtonMoreButton
					items={props.more}
					tooltipSingleton={props.tooltipSingleton}
				/>
			)}
		</div>
	)
);
