import { MenuItem } from "~src/menu/item/interface";
import { PrefsState } from "~src/prefs/state";

export const getPreviewSplitMenu = (prefs: PrefsState): MenuItem[] => [
	{
		type: "group",
		heading: { text: "Preview Layout" },
		actions: [
			{
				action: () => prefs.setPreviewSplit(true),
				label: "Split",
				active: prefs.previewSplit === true,
			},
			{
				action: () => prefs.setPreviewSplit(false),
				label: "Full",
				active: prefs.previewSplit === false,
			},
		],
	},
];
