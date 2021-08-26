declare module "*.module.css" {
	const classes: { readonly [key: string]: string };
	export = classes;
	export default classes;
}

declare module "monaco-vim" {
	export interface EditorVimMode {
		dispose: () => void;
	}

	type initVimModeFn = (
		editor: Editor,
		statusElm: HTMLElement
	) => EditorVimMode;

	const initVimMode: initVimModeFn;
	export { initVimMode };

	const VimMode: {
		Vim: {
			noremap: (from: string, to: string) => void;
			map: (from: string, to: string, mode: string) => void;
		};
	};
	export { VimMode };
}
