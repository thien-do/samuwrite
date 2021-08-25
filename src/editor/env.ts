import * as monaco from "monaco-editor";

const MonacoEnvironment: monaco.Environment = {
	getWorkerUrl: function (_moduleId, _label) {
		return "/editor.worker.js";
	},
};

export const ensureEditorEnv = () => {
	if ((self as any).MonacoEnvironment !== MonacoEnvironment) {
		(self as any).MonacoEnvironment = MonacoEnvironment;
	}
};
