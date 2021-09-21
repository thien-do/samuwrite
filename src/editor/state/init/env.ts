import * as monaco from "monaco-editor";

const setup = {
	current: false,
};

export const ensureEditorEnv = (): void => {
	if (setup.current === true) return;

	// Setup workers
	// https://github.com/microsoft/monaco-editor/blob/main/docs/integrate-esm.md#using-parcel
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	(self as any).MonacoEnvironment = {
		getWorkerUrl: function (_moduleId, _label) {
			return "/editor.worker.js";
		},
	} as monaco.Environment;

	// // Setup Vim
	// // https://github.com/brijeshb42/monaco-vim#adding-custom-key-bindings
	// const { Vim } = VimMode;
	// // Vim.noremap("j", "gj");
	// // Vim.noremap("gj", "j");
	// // Vim.noremap("k", "gk");
	// // Vim.noremap("gk", "k");
	// Vim.map("jj", "<Esc>", "insert");
	// Vim.map("jk", "<Esc>", "insert");

	// React to font changes
	document.fonts.ready.then(() => {
		monaco.editor.remeasureFonts();
	});

	setup.current = true;
};
