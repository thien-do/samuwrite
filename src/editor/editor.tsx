import * as monaco from "monaco-editor";
import { useEffect, useRef } from "react";
import * as styles from "./editor.module.css";

const MonacoEnvironment: monaco.Environment = {
	getWorkerUrl: function (_moduleId, _label) {
		return "./editor.worker.js";
	},
};

const ensureEditorEnv = () => {
	if ((self as any).MonacoEnvironment !== MonacoEnvironment) {
		(self as any).MonacoEnvironment = MonacoEnvironment;
	}
};

const createEditor = (container: HTMLElement) => {
	monaco.editor.create(container, {
		value: "Hello world",
		language: "markdown",
	});
};

export const Editor = () => {
	const containerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const container = containerRef.current;
		if (container === null) throw Error("Container is not attached");
		ensureEditorEnv();
		createEditor(container);
	}, []);

	return <div className={styles.container} ref={containerRef} />;
};
