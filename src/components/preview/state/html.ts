import { useEffect, useState } from "react";
import rehypeDomStringify from "rehype-dom-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { rehypeSourceMap } from "rehype-source-map";
import { unified } from "unified";
import { Editor } from "~src/components/editor/state/state";

const processor = unified()
	.use(remarkParse)
	.use(remarkRehype)
	.use(rehypeDomStringify)
	.use(rehypeSourceMap);

interface Params {
	editor: Editor | null;
}

export const usePreviewHtml = (params: Params): string => {
	const { editor } = params;

	const [html, setHtml] = useState("");

	useEffect(() => {
		if (editor === null) return;
		const listener = editor.onDidChangeModelContent(async () => {
			const file = await processor.process(editor.getValue());
			const text = file.toString();
			setHtml(text);
		});
		return () => listener.dispose();
	}, [editor]);

	return html;
};
