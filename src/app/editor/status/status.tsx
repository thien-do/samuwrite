import { RefObject } from "react";
import { getContentWidth } from "~src/prefs/size/size";
import { PrefsState } from "~src/prefs/state";
import s from "./status.module.css";

interface Props {
	statusRef: RefObject<HTMLDivElement>;
	size: PrefsState["size"];
}

export const EditorStatus = (props: Props): JSX.Element => (
	<div
		className={s.container}
		style={{ maxWidth: getContentWidth({ size: props.size }) }}
		ref={props.statusRef}
	/>
);
