import * as monaco from "monaco-editor";
import { useEffect, useRef } from "react";
import * as styles from "./editor.module.css";

const MonacoEnvironment: monaco.Environment = {
	getWorkerUrl: function (_moduleId, _label) {
		// @TODO: https://github.com/parcel-bundler/parcel/issues/6756
		return "./node_modules/monaco-editor/esm/vs/editor/editor.worker.js";
	},
};

const ensureEditorEnv = () => {
	if ((self as any).MonacoEnvironment !== MonacoEnvironment) {
		(self as any).MonacoEnvironment = MonacoEnvironment;
	}
};

type Editor = monaco.editor.IStandaloneCodeEditor;

const createEditor = (container: HTMLElement): Editor => {
	return monaco.editor.create(container, {
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
		const editor = createEditor(container);
		return () => {
			editor.dispose();
		};
	}, []);

	return <div className={styles.container} ref={containerRef} />;
};
