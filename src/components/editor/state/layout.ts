import { RefObject, useEffect } from "react";
import { getRef } from "~src/utils/ref";
import { EditorOptions, EditorState } from "./state";

interface Params {
	editor: EditorState;
	containerRef: RefObject<HTMLDivElement>;
}

export const getEditorLayout = (container: HTMLDivElement): EditorOptions => {
	const freePadding = container.clientWidth - 720;
	const expected = Math.round(freePadding / 2);
	return {
		lineDecorationsWidth: Math.max(expected, 48),
		wordWrapColumn: 64,
	};
};

/**
 * Re-calculate editor layout when container changes
 */
export const useEditorLayout = (params: Params): void => {
	const { containerRef } = params;
	const editor = params.editor.value;

	useEffect(() => {
		if (editor === null) return;
		const container = getRef(containerRef, "Container is null");
		const observer = new ResizeObserver(() => {
			editor.layout();
			editor.updateOptions(getEditorLayout(container));
		});
		observer.observe(container);
		return () => void observer.unobserve(container);
	}, [editor, containerRef]);
};
