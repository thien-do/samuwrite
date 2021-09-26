import { useSingleton } from "@tippyjs/react";
import { KeyboardEvent, RefObject, useCallback, useRef } from "react";
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

const escToEditor =
	(editor: Editor) =>
	(event: KeyboardEvent<HTMLDivElement>): void => {
		if (event.key === "Escape") {
			editor.focus();
			event.stopPropagation();
		}
	};

export const Toolbar = (props: Props): JSX.Element => {
	const { file, editor, prefs } = props;
	const { size } = props.prefs;

	const bodyRef = useRef<HTMLDivElement>(null);
	const [source, target] = useSingleton();

	useToolbarShorcut(bodyRef);

	const body = (
		<div
			className={s.body}
			style={{ maxWidth: getContentWidth({ size }) }}
			ref={bodyRef}
			onKeyDown={escToEditor(editor)}
		>
			<TooltipSource singleton={source} />
			<ToolbarOpen singleton={target} file={file} editor={editor} />
			<ToolbarSave singleton={target} file={file} editor={editor} />
			<ToolbarPreview singleton={target} prefs={prefs} editor={editor} />
			<ToolbarVim singleton={target} prefs={prefs} />
			<div className={s.grow} />
			<ToolbarPrefs singleton={target} prefs={prefs} />
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
