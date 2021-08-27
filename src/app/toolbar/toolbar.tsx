import { useSingleton } from "@tippyjs/react";
import { TooltipSource } from "../../components/tooltip/tooltip";
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
	handle: FileSystemFileHandle | null;
	setHandle: (handle: FileSystemFileHandle | null) => void;
}

export const Toolbar = (props: Props) => {
	const [source, target] = useSingleton();
	return (
		<div className={s.toolbar}>
			<TooltipSource singleton={source} delay={500} />
			<ToolbarOpen singleton={target} setHandle={props.setHandle} />
			<ToolbarSave
				singleton={target}
				handle={props.handle}
				editor={props.editor}
			/>
			<ToolbarPreview singleton={target} />
			<ToolbarVim singleton={target} />
			<div className={s.grow} />
			<ToolbarSetting singleton={target} />
			<ToolbarMenu singleton={target} />
		</div>
	);
};
