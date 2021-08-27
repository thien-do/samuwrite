import Tippy, { useSingleton } from "@tippyjs/react";
import { DiVim } from "react-icons/di";
import { VscBook, VscMenu, VscSave, VscSettingsGear } from "react-icons/vsc";
import { Button } from "../../components/button/button";
import { Tooltip, TooltipSource } from "../../components/tooltip/tooltip";
import { Editor } from "../editor/type";
import { ToolbarMenu } from "./menu";
import { ToolbarOpen } from "./open";
import { ToolbarSave } from "./save";
import { ToolbarSetting } from "./setting";
import s from "./toolbar.module.css";

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
			<Button
				onClick={() => window.alert("Coming soon")}
				Icon={VscBook}
				shortcut={[
					{ type: "command-or-control" },
					{ type: "char", value: "P" },
				]}
				tooltip="Preview"
				tooltipSingleton={target}
				more={{
					items: [],
					tooltip: "More preview options",
				}}
			/>
			<Button
				onClick={() => window.alert("Coming soon")}
				Icon={DiVim}
				tooltip="Toggle Vim mode"
				tooltipSingleton={target}
				shortcut={[
					{ type: "command-or-control" },
					{ type: "char", value: "M" },
				]}
			/>
			<div className={s.grow} />
			<ToolbarSetting singleton={target} />
			<ToolbarMenu singleton={target} />
		</div>
	);
};
