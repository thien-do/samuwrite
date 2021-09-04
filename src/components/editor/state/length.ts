import { RefObject, useEffect } from "react";
import {
	getContentWidth,
	SizeName,
	SIZE_METRICS,
} from "~src/components/prefs/size/size";
import { PrefsState } from "~src/components/prefs/state";
import { getRef } from "~src/utils/ref";
import { EditorState } from "./state";

interface Params {
	editor: EditorState;
	prefs: PrefsState;
	containerRef: RefObject<HTMLDivElement>;
}

const getLeft = (params: {
	container: HTMLDivElement;
	size: SizeName;
}): number => {
	const content = getContentWidth({ size: params.size });
	const free = params.container.clientWidth - content;
	const expected = Math.round(free / 2);
	const left = Math.max(expected, 48);
	return left;
};

/**
 * Re-calculate editor layout when container changes
 */
export const useEditorLength = (params: Params): void => {
	const { containerRef } = params;
	const editor = params.editor.value;
	const size = params.prefs.size;

	useEffect(() => {
		if (editor === null) return;
		const container = getRef(containerRef, "Container is null");
		const observer = new ResizeObserver(() => {
			editor.updateOptions({
				lineDecorationsWidth: getLeft({ container, size }),
			});
			editor.layout();
		});
		observer.observe(container);
		return () => void observer.unobserve(container);
	}, [editor, containerRef, size]);
};
