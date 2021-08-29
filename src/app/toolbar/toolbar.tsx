import { useSingleton } from "@tippyjs/react";
import { TooltipSource } from "../../components/tooltip/tooltip";
import { HandleState } from "../../file/use-handle";
import { Editor } from "../editor/type";
import { ToolbarMenu } from "./menu";
import { ToolbarOpen } from "./open";
import { ToolbarPreview } from "./preview";
import { ToolbarSave } from "./save";
import { ToolbarSetting } from "./setting";
import s from "./toolbar.module.css";
import { ToolbarVim } from "./vim";

interface Props {
	editor: Editor | null;
	file: HandleState;
	/** Always show the toolbar, not only on hover */
	show: boolean;
}

export const Toolbar = (props: Props) => {
	const [source, target] = useSingleton();
	const body = (
		<div className={s.body}>
			<TooltipSource singleton={source} delay={500} />
			<ToolbarOpen singleton={target} setHandle={props.file.setHandle} />
			<ToolbarSave
				singleton={target}
				handle={props.file.handle}
				editor={props.editor}
			/>
			<ToolbarPreview singleton={target} />
			<ToolbarVim singleton={target} />
			<div className={s.grow} />
			<ToolbarSetting singleton={target} />
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
