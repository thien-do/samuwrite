import { useSingleton } from "@tippyjs/react";
import { Editor } from "~/src/components/editor/state/state";
import { FileState } from "~/src/components/file/state";
import { TooltipSource } from "~/src/components/tooltip/tooltip";
import { PrefsState } from "../prefs/state";
import { ToolbarMenu } from "./menu";
import { ToolbarOpen } from "./open";
import { ToolbarPrefs } from "./prefs";
import { ToolbarPreview } from "./preview";
import { ToolbarSave } from "./save";
import s from "./toolbar.module.css";
import { ToolbarVim } from "./vim";

interface Props {
	editor: Editor | null;
	file: FileState;
	prefs: PrefsState;
	/** Always show the toolbar, not only on hover */
	show: boolean;
}

export const Toolbar = (props: Props): JSX.Element => {
	const [source, target] = useSingleton();
	const body = (
		<div className={s.body}>
			<TooltipSource singleton={source} delay={500} />
			<ToolbarOpen singleton={target} file={props.file} />
			<ToolbarSave singleton={target} file={props.file} editor={props.editor} />
			<ToolbarPreview singleton={target} prefs={props.prefs} />
			<ToolbarVim singleton={target} prefs={props.prefs} />
			<div className={s.grow} />
			<ToolbarPrefs singleton={target} prefs={props.prefs} />
			<ToolbarMenu singleton={target} />
		</div>
	);
	return (
		// The "buffer" contains the top padding as a buffer to show the
		// toolbar when the mouse is near
		<div className={[s.buffer, props.show ? s.show : ""].join(" ")}>
			{/* The "container" is for the visual toolbar, with the blurred
			background */}
			<div className={s.container}>{body}</div>
		</div>
	);
};
