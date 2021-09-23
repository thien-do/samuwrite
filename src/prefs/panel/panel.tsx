import { RefObject } from "react";
import { ThemePref } from "../../theme/pref/pref";
import { PrefsState } from "../state";
import s from "./panel.module.css";
import { SizePref } from "./size/size";

interface Props {
	prefs: PrefsState;
	focusRef: RefObject<HTMLDivElement>;
}

export const PrefsPanel = (props: Props): JSX.Element => (
	<div className={s.container}>
		{/* This is simpler than trying to focus on the first focusable
		child */}
		<div
			tabIndex={0}
			ref={props.focusRef}
			aria-label="Dummy focus anchor. Press tab to navigate."
		/>
		<SizePref prefs={props.prefs} />
		<ThemePref prefs={props.prefs} />
	</div>
);
