import * as monaco from "monaco-editor";
import { useEffect, useState } from "react";
import { EditorState } from "~src/editor/state/state";

interface Params {
	editor: EditorState;
}

interface AppToolbarState {
	mute: boolean;
	show: boolean;
	handlers: Pick<
		React.DOMAttributes<HTMLDivElement>,
		"onMouseOver" | "onFocus"
	>;
}

export const useToolbarAutohide = (params: Params): AppToolbarState => {
	const editor = params.editor.value;

	const [mute, setMute] = useState(false);
	const [show, setShow] = useState(true);

	// Hide toolbar when user starts typing or scrolling
	useEffect(() => {
		if (editor === null) return;
		const disposable: monaco.IDisposable[] = [
			editor.onDidChangeModelContent(() => {
				setShow(false);
			}),
			editor.onDidScrollChange((event) => {
				if (event.scrollTopChanged) setShow(false);
			}),
		];
		return () => disposable.forEach((d) => d.dispose());
	}, [editor]);

	// Mute/cancel mouse events on toolbar while user is interacting with the
	// editor with their mouse (e.g. drag to copy)
	useEffect(() => {
		if (editor === null) return;
		const disposable: monaco.IDisposable[] = [
			editor.onMouseDown(() => void setMute(true)),
			editor.onMouseUp(() => void setMute(false)),
		];
		return () => disposable.forEach((d) => d.dispose());
	}, [editor]);

	const handlers: AppToolbarState["handlers"] = {
		// Show toolbar on hover (note that we don't auto hide toolbar on mouse out)
		onMouseOver: () => void setShow(true),
		onFocus: () => void setShow(true),
	};

	return { handlers, mute, show };
};
