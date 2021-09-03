import { RefObject, useEffect } from "react";
import { getRef } from "~src/utils/ref";
import { EditorState } from "./state";

interface Params {
	editor: EditorState;
	containerRef: RefObject<HTMLDivElement>;
}

export const getEditorLeftPadding = (container: HTMLDivElement): number => {
	const freePadding = container.clientWidth - 1000;
	const expected = Math.round(freePadding / 2);
	return Math.max(expected, 24);
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
			editor.updateOptions({
				lineDecorationsWidth: getEditorLeftPadding(container),
			});
		});
		observer.observe(container);
		return () => void observer.unobserve(container);
	}, [editor, containerRef]);
};
