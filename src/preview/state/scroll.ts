import { useEffect, useMemo, useRef } from "react";
import { Editor } from "~src/editor/state/state";
import debounce from "lodash.debounce";

interface Params {
	editor: Editor | null;
}

type Ref = React.RefObject<HTMLDivElement>;

const scrollPreview = (editor: Editor, contentRef: Ref): void => {
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

	const listener: null | (() => void) = useMemo(() => {
		if (editor === null) return null;
		return debounce(() => scrollPreview(editor, contentRef), 100);
	}, [editor]);

	useEffect(() => {
		if (editor === null || listener === null) return;
		const disposable = editor.onDidScrollChange(listener);
		return () => disposable.dispose();
	}, [editor, listener]);

	return contentRef;
};
