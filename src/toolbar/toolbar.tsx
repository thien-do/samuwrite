import { useSingleton } from "@tippyjs/react";
import { RefObject, useCallback, useRef } from "react";
import { Editor } from "~src/editor/state/state";
import { FileState } from "~src/file/state";
import { useShortcut } from "~src/shortcut/use-shortcut";
import { TooltipSource } from "~src/tooltip/tooltip";
import { getContentWidth } from "../prefs/size/size";
import { PrefsState } from "../prefs/state";
import { ToolbarMenu } from "./menu";
import { ToolbarOpen } from "./open";
import { ToolbarPrefs } from "./prefs";
import { ToolbarPreview } from "./preview";
import { ToolbarSave } from "./save";
import { SHORTCUTS } from "./shortcuts";
import s from "./toolbar.module.css";
import { ToolbarVim } from "./vim";

interface Props {
	editor: Editor;
	file: FileState;
	prefs: PrefsState;
	/** Always show the toolbar, not only on hover */
	show: boolean;
}

/** Assign shortcut to focus on toolbar */
const useToolbarShorcut = (bodyRef: RefObject<HTMLDivElement>): void => {
	const callback = useCallback(() => {
		const body = bodyRef.current;
		if (body === null) throw Error("Toolbar ref is not attached");
		const button = body.querySelector("button");
		if (button === null) throw Error("Toolbar doesn't have any button");
		button.focus();
	}, [bodyRef]);

	useShortcut({ keys: SHORTCUTS.toolbar, callback });
};

export const Toolbar = (props: Props): JSX.Element => {
	const bodyRef = useRef<HTMLDivElement>(null);
	const [source, target] = useSingleton();
	const { size } = props.prefs;

	useToolbarShorcut(bodyRef);

	const body = (
		<div
			className={s.body}
			style={{ maxWidth: getContentWidth({ size }) }}
			ref={bodyRef}
			onKeyDown={(event) => {
				if (event.key === "Escape") {
					props.editor.focus();
					event.stopPropagation();
				}
			}}
		>
			<TooltipSource singleton={source} />
			<ToolbarOpen singleton={target} file={props.file} editor={props.editor} />
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
