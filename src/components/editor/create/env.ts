import * as monaco from "monaco-editor";
import { VimMode } from "monaco-vim";

const setup = {
	current: false,
};

export const ensureEditorEnv = () => {
	if (setup.current === true) return;

	// https://github.com/microsoft/monaco-editor/blob/main/docs/integrate-esm.md#using-parcel
	(self as any).MonacoEnvironment = {
		getWorkerUrl: function (_moduleId, _label) {
			return "/editor.worker.js";
		},
	} as monaco.Environment;

	// https://github.com/brijeshb42/monaco-vim#adding-custom-key-bindings
	const { Vim } = VimMode;
	// Vim.noremap("j", "gj");
	// Vim.noremap("gj", "j");
	// Vim.noremap("k", "gk");
	// Vim.noremap("gk", "k");
	Vim.map("jj", "<Esc>", "insert");
	Vim.map("jk", "<Esc>", "insert");

	setup.current = true;
};
