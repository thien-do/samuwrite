import * as monaco from "monaco-editor";
import { useEffect, useRef } from "react";

export const Test = (): JSX.Element => {
	const container = useRef<HTMLDivElement>(null);

	useEffect(() => {
		import("monaco-editor").then((monaco) => {
			monaco.editor.create(container.current!, {
				value: 'console.log("Hello, world")',
				language: "javascript",
			});
		});
	}, []);

	return <div ref={container} />;
};
