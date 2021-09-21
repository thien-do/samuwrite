import { MenuItem } from "~src/menu/item/item";
import { PrefsState } from "~src/prefs/state";

export const getPreviewSplitMenu = (prefs: PrefsState): MenuItem[] => [
	{ type: "heading", text: "Preview Layout" },
	{
		type: "action",
		action: () => void prefs.setPreviewSplit(true),
		label: "Split view",
	},
	{
		type: "action",
		action: () => void prefs.setPreviewSplit(false),
		label: "Full view",
	},
];
