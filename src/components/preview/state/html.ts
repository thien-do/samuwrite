import { useEffect, useState } from "react";
import rehypeDomStringify from "rehype-dom-stringify";
import { rehypeSourceMap } from "rehype-source-map";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { Editor } from "~src/components/editor/state/state";

const processor = unified()
	.use(remarkParse)
	.use(remarkGfm)
	.use(remarkRehype)
	.use(rehypeDomStringify)
	.use(rehypeSourceMap);

interface Params {
	editor: Editor | null;
}

const getHtml = async (editor: Editor): Promise<string> => {
	const file = await processor.process(editor.getValue());
	const html = file.toString();
	return html;
};

export const usePreviewHtml = (params: Params): string => {
	const { editor } = params;

	const [html, setHtml] = useState("");

	useEffect(() => {
		if (editor === null) return;
		// Set initial value
		getHtml(editor).then((text) => setHtml(text));

		// Listen for changes
		const listener = editor.onDidChangeModelContent(async () => {
			setHtml(await getHtml(editor));
		});
		return () => listener.dispose();
	}, [editor]);

	return html;
};
