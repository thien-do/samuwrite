import { ShortcutKey } from "~src/components/shortcut/shortcut";

const OPEN: ShortcutKey[] = [
	{ type: "command-or-control" },
	{ type: "char", value: "O" },
];

const NEW_FILE: ShortcutKey[] = [
	{ type: "command-or-control" },
	{ type: "char", value: "N" },
];

const OPEN_RECENT: ShortcutKey[] = [
	{ type: "command-or-control" },
	{ type: "shift" },
	{ type: "char", value: "O" },
];

const MENU: ShortcutKey[] = [
	{ type: "command-or-control" },
	{ type: "char", value: "/" },
];

const PREFERENCES: ShortcutKey[] = [
	{ type: "command-or-control" },
	{ type: "char", value: "," },
];

const PREVIEW: ShortcutKey[] = [
	{ type: "command-or-control" },
	{ type: "char", value: "P" },
];

const PRINT: ShortcutKey[] = [
	{ type: "command-or-control" },
	{ type: "shift" },
	{ type: "char", value: "P" },
];

const SAVE: ShortcutKey[] = [
	{ type: "command-or-control" },
	{ type: "char", value: "S" },
];

const SAVE_AS: ShortcutKey[] = [
	{ type: "command-or-control" },
	{ type: "shift" },
	{ type: "char", value: "S" },
];

const VIM_MODE: ShortcutKey[] = [
	{ type: "command-or-control" },
	{ type: "char", value: "M" },
];

export const SHORTCUTS = {
	OPEN,
	NEW_FILE,
	OPEN_RECENT,
	SAVE,
	SAVE_AS,
	PREVIEW,
	PRINT,
	VIM_MODE,
	PREFERENCES,
	MENU,
};
