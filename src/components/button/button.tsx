import { ButtonHTMLAttributes, useState } from "react";
import { IconType } from "react-icons";
import { VscChevronDown } from "react-icons/vsc";
import { usePopper } from "react-popper";
import { Shortcut, ShortcutKey } from "../shortcut/shortcut";
import s from "./button.module.css";
import { ButtonMoreMenu, ButtonMoreMenuItem } from "./more/menu";

interface Props {
	Icon: IconType;
	onClick: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
	shortcut: ShortcutKey[];
	more?: ButtonMoreMenuItem[];
}

export const Button = (props: Props): JSX.Element => {
	const [moreButton, setMoreButton] = useState<HTMLButtonElement | null>(null);
	const [menu, setMenu] = useState<HTMLDivElement | null>(null);
	const [moreMenu, setMoreMenu] = useState(false);

	const popper = usePopper(moreButton, menu, {
		placement: "top",
	});

	return (
		<div className={[s.container].join(" ")}>
			<button
				className={[s.button, s.primary].join(" ")}
				onClick={props.onClick}
			>
				<props.Icon size={24} />
				<Shortcut keys={props.shortcut} />
			</button>
			{props.more && (
				<button
					className={[s.button, s.moreButton].join(" ")}
					ref={setMoreButton}
					onClick={() => setMoreMenu(!moreMenu)}
				>
					<VscChevronDown size={24} />
				</button>
			)}
			{props.more && moreMenu && (
				<ButtonMoreMenu items={props.more} popper={popper} setMenu={setMenu} />
			)}
		</div>
	);
};
