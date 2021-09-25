import { useEffect, useRef } from "react";
import { Editor } from "~src/editor/state/state";

interface Params {
	editor: Editor | null;
}

type Ref = React.RefObject<HTMLDivElement>;

const scrollChangeListener = (editor: Editor, contentRef: Ref): void => {
	const [top] = editor.getVisibleRanges();
	const line = top.startLineNumber;
	if (line === 1) {
		const container = contentRef.current;
		container?.parentElement?.scrollTo({ top: 0, behavior: "smooth" });
	} else {
		const element = document.querySelector(`[data-line="${line}"]`);
		element?.scrollIntoView({ block: "start", behavior: "smooth" });
	}
};

export const usePreviewScroll = (params: Params): Ref => {
	const { editor } = params;
	const contentRef = useRef(null);

	useEffect(() => {
		if (editor === null) return;
		const disposable = editor.onDidScrollChange(() =>
			scrollChangeListener(editor, contentRef)
		);
		return () => disposable.dispose();
	}, [editor]);

	return contentRef;
};
