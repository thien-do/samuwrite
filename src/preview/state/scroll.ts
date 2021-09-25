import { useEffect } from "react";
import { Editor } from "~src/editor/state/state";

interface Params {
	editor: Editor | null;
}

const scrollChangeListener = (editor: Editor): void => {
	const [top] = editor.getVisibleRanges();
	const line = top.startLineNumber;
	if (line === 0) {
		const container = document.querySelector(".markdown-body");
		container?.parentElement?.scrollTo({ top: 0, behavior: "smooth" });
	} else {
		const element = document.querySelector(`[data-line="${line}"]`);
		element?.scrollIntoView({ block: "nearest", behavior: "smooth" });
	}
};

export const usePreviewScroll = (params: Params): void => {
	const { editor } = params;

	useEffect(() => {
		if (editor === null) return;
		const d = editor.onDidScrollChange(() => scrollChangeListener(editor));
		return () => d.dispose();
	}, [editor]);
};
