import { useEffect, useState } from "react";
import rehypeDomStringify from "rehype-dom-stringify";
import { rehypeSourceMap } from "rehype-source-map";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { Editor } from "~src/editor/state/state";

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
		const handler = async () => void setHtml(await getHtml(editor));
		const listeners = [
			editor.onDidChangeModelContent(handler),
			editor.onDidChangeModel(handler), // Open new file
		];
		return () => listeners.forEach((l) => l.dispose());
	}, [editor]);

	return html;
};
