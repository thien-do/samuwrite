import { ButtonHTMLAttributes, forwardRef, useState } from "react";
import { IconType } from "react-icons";
import { VscChevronDown } from "react-icons/vsc";
import "../tooltip/tooltip.css";
import { Shortcut, ShortcutKey } from "../shortcut/shortcut";
import s from "./button.module.css";
import { ButtonMoreMenuItem } from "./more/menu";

interface Props {
	Icon: IconType;
	onClick: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
	shortcut: ShortcutKey[];
	more?: ButtonMoreMenuItem[];
}

export const Button = forwardRef<HTMLButtonElement, Props>(
	(props, ref): JSX.Element => {
		const [moreMenu, setMoreMenu] = useState(false);

		return (
			<div className={[s.container].join(" ")}>
				<button
					className={[s.button, s.primary].join(" ")}
					onClick={props.onClick}
					ref={ref}
				>
					<props.Icon size={24} />
					<Shortcut keys={props.shortcut} />
				</button>
				{props.more && (
					<button
						className={[s.button, s.moreButton].join(" ")}
						onClick={() => setMoreMenu(!moreMenu)}
					>
						<VscChevronDown size={24} />
					</button>
				)}
				{/* {props.more && moreMenu && (
				<ButtonMoreMenu items={props.more} popper={popper} setMenu={setMenu} />
			)} */}
			</div>
		);
	}
);
