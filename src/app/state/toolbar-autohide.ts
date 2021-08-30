import * as monaco from "monaco-editor";
import { RefObject, useEffect, useRef, useState } from "react";
import { Editor } from "~/src/components/editor/state/state";

interface Params {
	editor: Editor | null;
}

interface AppToolbarState {
	ref: RefObject<HTMLDivElement>;
	mute: boolean;
	show: boolean;
}

export const useToolbarAutohide = (params: Params): AppToolbarState => {
	const { editor } = params;

	const ref = useRef<HTMLDivElement>(null);
	const [mute, setMute] = useState(false);
	const [show, setShow] = useState(true);

	// Hide toolbar when user starts typing or scrolling
	useEffect(() => {
		if (editor === null) return;
		const disposable: monaco.IDisposable[] = [
			editor.onDidChangeModelContent(() => void setShow(false)),
			editor.onDidScrollChange(() => void setShow(false)),
		];
		return () => disposable.forEach((d) => d.dispose());
	}, [editor]);

	// Show toolbar on hover (note that we don't auto hide toolbar on mouse out)
	useEffect(() => {
		const toolbar = ref.current;
		if (toolbar === null) throw Error("Toolbar ref is null");
		const listener = () => void setShow(true);
		toolbar.addEventListener("mouseover", listener);
		return () => toolbar.removeEventListener("mouseover", listener);
	}, []);

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

	return { ref, mute, show };
};
